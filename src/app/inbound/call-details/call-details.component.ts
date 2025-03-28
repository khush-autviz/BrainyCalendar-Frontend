import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@node_modules/@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { CallDTO, CallServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';
import * as bootstrap from 'bootstrap'; // Import Bootstrap
@Component({
  selector: 'app-call-details',
  templateUrl: './call-details.component.html',
  styleUrls: ['./call-details.component.css']
})
export class CallDetailsComponent extends AppComponentBase implements OnInit  {
  callId: any
  callDetails:CallDTO=new CallDTO();
  popupContentIndex: number;
  selectedTranscript: any[] = [];
  tendenyName = this.appSession.tenant.name;
  userName=this.appSession.user.name;
  audio = "";
  isLoading = false;
  constructor(
     private injector: Injector,
     private _callService:CallServiceServiceProxy,
      public session: AppSessionService,
      private router: Router,
     private route: ActivatedRoute)
     {
      super(injector)
     }
     ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
        const callId = params['callId'];        
        if(callId)
        {
            this.callId = callId;
            this.getCallDetails();
            
        }
      })    
        
    }
    getCallDetails() {
      this.isLoading = true;
      this._callService.getCallDetailsByCallId(this.callId).subscribe((res) => {
        this.callDetails = res;
        this.isLoading = false;
      }, err=>{
        this.isLoading = false;
      })
    }

    async fetchRecording(id:number){
      this.isLoading = true;
      this._callService.getRecording(id).subscribe(data => {
          this.isLoading = false;
          if (data) {
            this.audio  = data;         
          }
        }, error=>{
          this.isLoading = false;
        })      
    }
    openTranscriptModal(callDetails: any): void {
      this.selectedTranscript = callDetails.transcript || [];
   
      const modal = new bootstrap.Modal(document.getElementById('transcriptModal'));
      modal.show();
    }
    backToList()
    {
      this.router.navigate(["app/inbound-call"]);
    }
  }
