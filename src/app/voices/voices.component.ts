import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { CallConfigurationServiceProxy, CallServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { error } from 'console';

@Component({
  selector: 'app-voices',
  templateUrl: './voices.component.html',
  styleUrls: ['./voices.component.css']
})
export class VoicesComponent extends AppComponentBase implements OnInit {

  voices: any
  id: any = "";
  isLoading = false;
  audio = "";
  currentIndex = 0;
  cardWidth = 285; // card width + gap

  @Input() dynamicHeight: number = 508;
  @Input() isParentExist = false;
  constructor(private _callService: CallServiceServiceProxy,
    private _callconfig: CallConfigurationServiceProxy,
    private injector: Injector,
  ) {
    super(injector)
  }

  ngOnInit() {
    this.getVoices();
    this.getSavedVoiceIds();

  }

  getVoices() {
    this.isLoading = true;
    this._callService.getAllVoices().subscribe({
      next: (res) => {
        this.voices = res;

        if (this.id) {
          var voices = this.voices.find((voice) => voice.id === this.id);
          if (voices) {
            this.voices = this.voices.filter((voice) => voice.id !== this.id);
            this.voices.unshift(voices);
          }
        }
        this.voices = this.voices.slice(0, 50);
        this.isLoading = false;
      },

    }),
      (err) => {
        this.isLoading = false;
      }
  }
  getSavedVoiceIds() {
    this._callconfig.getAllVoiceIds().subscribe((voiceIds) => {
      if (voiceIds.length)
        this.id = voiceIds[0];
    }),
      (error) => {
      }
  }

  onSave() {
    if (this.id) {
      this.isLoading = true;
      this._callconfig.insertOrUpdateVoice(this.id).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.notify.success("Saved Successfully");
        },
        error: (err) => {
          this.isLoading = false;
          this.notify.error("Failed to save changes: " + err.message);
        },
      });
    }
  }


  handleButtonClick(voice) {
    this.isLoading = true
    this._callService.generateVoice(voice.id).subscribe(res => {
      if (res) {
        voice["sampleVoice"] = res.includes("http")? res : `data:audio/mp3;base64,${res}`;
        this.isLoading = false
      }
    }),
      (error) => {
        console.log(error , "voice error")
        this.isLoading = false
      }
  }


  get translateX() {
    return -this.currentIndex * this.cardWidth;
  }

  next() {
    if (this.currentIndex < this.voices.length - 4) {
      this.currentIndex++;
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
