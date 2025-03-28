import { Component, ElementRef, ViewChild } from '@angular/core';
import { RetellWebClient, StartCallConfig } from 'retell-client-js-sdk';
import { HttpClient } from '@angular/common/http';
import { CallServiceServiceProxy } from '@shared/service-proxies/service-proxies';


const sdk = new RetellWebClient();

@Component({
  selector: 'app-voice-demo',
  templateUrl: './voice-demo.component.html',
  styleUrls: ['./voice-demo.component.scss']
})
export class VoiceDemoComponent {

  @ViewChild('chatContainer') chatContainer: ElementRef;

  isUserScrollingUp = false
  isVoiceDemo: boolean = false;
  isLoading: boolean = false;
  isMuted: boolean = false;
  transcript: { role: string, content: string }[] = [];
  call_initiated: boolean = false
  call_on: boolean = false
  openTranscript: boolean = true

  // Updated list of industries
  items: { name: string, icon: string, agentId: string }[] = [
    { name: 'Hotel', icon: 'fa-hotel', agentId: 'agent_49ed5c07881581c5c057ba1906' },
    { name: 'E-commerce and Retail', icon: 'fa-shop', agentId: 'agent_0c3885e99cadbff0f90cd1af4a' },
    { name: 'Financial Services', icon: 'fa-building-columns', agentId: 'agent_ef35664c98ca80e3cb865eda24' },
    { name: 'Telecommunications', icon: 'fa-tower-cell', agentId: 'agent_bc2a1300819bb17fec0d4cedb3' },
    { name: 'Insurance', icon: 'fa-building-shield', agentId: 'agent_cfc9148702c95db320ba8a030e' },
    { name: 'Healthcare', icon: 'fa-hospital', agentId: 'agent_218dcc8ef7dcce7585cd21d42a' }

    // CLIENTS
    // { name: 'Hotel', icon: 'fa-hotel', agentId: 'agent_5f3b9c72958fc2abe6e0e4d6a1' },
    // { name: 'E-commerce and Retail', icon: 'fa-shop', agentId: 'agent_0c75c20be58835f72a6eec5f73' },
    // { name: 'Financial Services', icon: 'fa-building-columns', agentId: 'agent_74a7826737264df90ef2ff03bb' },
    // { name: 'Telecommunications', icon: 'fa-tower-cell', agentId: 'agent_407c7d86be59fd2074c3ff7f50' },
    // { name: 'Insurance', icon: 'fa-building-shield', agentId: 'agent_0c865dfbdeb92cb26d8f27b5eb' },
    // { name: 'Healthcare', icon: 'fa-hospital', agentId: 'agent_cd8cbad01233441e4b341b54ca' }
  ];


  selectedItem: { name: string, icon: string, agentId: string } = this.items[0];
  otherAgents = [
    { name: 'Emma Stacy', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', voiceId: "11labs-Marissa" },
    { name: 'Tom Evans', img: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', voiceId: "11labs-Anthony" },
    { name: 'Natalia Granger', img: 'https://images.unsplash.com/photo-1557555187-23d685287bc3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fGdpcmx8ZW58MHx8MHx8fDI%3D', voiceId: "11labs-Amy" },
    { name: 'Daniel Maguire', img: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbnxlbnwwfHwwfHx8MA%3D%3D', voiceId: "11labs-Bing" },
    // Additional agents can be added here
  ];

  selectedAgent = this.otherAgents[0] // Default agent
  selectedIndustry = this.items[0]  // Default industry

  constructor(private callService: CallServiceServiceProxy) { }

  // Method to handle click event for industries
  onItemClick(item: { name: string, icon: string, agentId: string }) {
    this.selectedItem = item;
    this.selectedIndustry = item;
    const availableAgents = this.otherAgents.filter(agent => agent.name !== this.selectedAgent.name);

    const randomIndex = Math.floor(Math.random() * availableAgents.length);
    this.selectedAgent = availableAgents[randomIndex];

    this.changeAgent(this.selectedAgent)

  }

  handleVoiceDemoClick(): void {
    this.isVoiceDemo = !this.isVoiceDemo;
  }

  changeAgent(agent: { name: string; img: string, voiceId: string }): void {
    this.selectedAgent = agent;
    
    // Make the POST request
    this.callService.updateAgent(this.selectedItem.agentId, this.selectedAgent.voiceId).subscribe(
      (response) => {

      },
      (error) => {

      }
    );

  }

  handleCall(): void {
    this.transcript = []
    this.call_initiated = true
    this.isLoading = true;
    this.callService.createWebCall(this.selectedItem.agentId).subscribe(
      (response) => {
        const accessToken = response.access_token;

        const demoStartCallConfig: StartCallConfig = {
          accessToken: accessToken,
          sampleRate: 48000,
          captureDeviceId: 'default-capture-device-id',
          playbackDeviceId: 'default-playback-device-id',
          emitRawAudioSamples: true
        };

        sdk.startCall(demoStartCallConfig).then(() => {
          this.isLoading = false;
          this.call_on = true
          sdk.on('update', (update) => {

            if (update.transcript.length !== 5) {
              this.transcript = update.transcript.map((item: any) => ({
                role: item.role,
                content: item.content,
              }));

            } else {

              const liveSecondLastItem = update.transcript[update.transcript.length - 2];
              const currentLastItem = this.transcript[this.transcript.length - 1];

              if (liveSecondLastItem.content === currentLastItem.content) {
                this.transcript.push({
                  role: update.transcript[update.transcript.length - 1].role,
                  content: update.transcript[update.transcript.length - 1].content,
                });
              } else {
                this.transcript[this.transcript.length - 1] = {
                  role: update.transcript[update.transcript.length - 1].role,
                  content: update.transcript[update.transcript.length - 1].content,
                };
              }
            }


          });
        }).catch((error) => {
        });
      },
      (error) => {
      }
    );
  }

  handleCallEnd(): void {
    this.call_on = false
    sdk.stopCall();
    this.call_initiated = false
  }

  handleMute(): void {
    if (this.isMuted) {
      sdk.unmute();
    } else {
      sdk.mute();
    }
    this.isMuted = !this.isMuted;
  }

  openTranscriptBtn() {
    this.openTranscript = !this.openTranscript
  }

  ngOnInit(): void {
    this.changeAgent(this.selectedAgent) // This will be called on the first render
  }


  //Scroll automatically
  ngAfterViewInit() {
    const container = this.chatContainer.nativeElement;
    container.addEventListener('scroll', () => {
      this.isUserScrollingUp = container.scrollTop + container.clientHeight < container.scrollHeight - 10;
    });
  }
  
  ngAfterViewChecked() {
    // if (!this.isUserScrollingUp) {
    this.scrollToBottom();
    // }
  }

  private scrollToBottom() {
    if (!this.isUserScrollingUp) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      console.log(this.isUserScrollingUp);
    }
  }
}

