import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@node_modules/@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AppConsts } from '@shared/AppConsts';
import { LeadStatusEnumState } from '@shared/AppEnums';
import { CallDetailsDto, CallServiceServiceProxy, LeadDto, LeadServiceServiceProxy, MeetingScheduleDto, NotesDto, NotesServiceProxy, SendCallDTO } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.css']
})
export class LeadDetailsComponent extends AppComponentBase implements OnInit {

  leadId: any
  phone: any
  leadDetails: LeadDto = new LeadDto();
  calldetails: CallDetailsDto = new CallDetailsDto();
  meetingDetails: MeetingScheduleDto = new MeetingScheduleDto();
  noteDetail: NotesDto = new NotesDto();
  noteDetails = [];
  editMode = false;
  leadStatusEnumState= LeadStatusEnumState;
  isLoading = false;
  constructor(
    private _leadsService: LeadServiceServiceProxy,
    private route: ActivatedRoute,
    private injector: Injector,
    private _notesSerive: NotesServiceProxy,
    private router: Router,
    private callService: CallServiceServiceProxy
  ) {
    super(injector)
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const leadId = params['leadId'];
      if (leadId) {
        this.leadId = Number(leadId);
        this.getLeadDetails();
        this.getMeetingDetails();
        this.getNotes();
        this.getCallDetails()
      }
     
    })


  }
  getLeadDetails() {

    this.isLoading = true;
    this._leadsService.getLeadDetails(this.leadId).subscribe((res) => {
      this.leadDetails = res;
      this.isLoading = false;
    })
  }

  getMeetingDetails() {

    this._leadsService.getMeetingDetails(this.leadId).subscribe((res) => {
      this.meetingDetails = res;
    })
  }
  getCallDetails() {

    this._leadsService.getCallDetails(this.leadId).subscribe((res) => {
      this.calldetails = res;
    })
  }

  saveNote() {
    this.noteDetail.leadId = this.leadId;
    this._notesSerive.createNotes(this.noteDetail).subscribe((res) => {
      this.notify.success("Saved Successfully");
      this.noteDetail.note = "";
      this.getNotes();
    })
  }

  getNotes() {
    this._notesSerive.getNotes(this.leadId).subscribe((res) => {
      this.noteDetails = res;
    })
  }
  async fetchRecording(call){
    window.open(`${AppConsts.remoteServiceBaseUrl}/api/CallDetail/GetRecording?callId=`+call.id)
  }
  viewCallLogs() {
    // Pass the phoneNumber as a query parameter
    this.router.navigate(['app/inbound-call'], { queryParams: { leadId: this.leadId } });
  }
  bulkCall(){    
    let leadData = new SendCallDTO()    
    leadData.customerName = this.leadDetails.customerName;
    leadData.customerNumber = this.leadDetails.customerPhoneNumber;
    leadData.industry = this.appSession.tenant.industry;
    leadData.leadId = this.leadDetails.id;     

    this.callService.call(leadData).subscribe(res=>{
      this.notify.info("Call Enqueue");
      
    })
  }
  toggleEdit() {
    this.editMode = !this.editMode;
  }

  // Method to update the lead details after editing
  updateLeadDetails() {
    this.isLoading = true; 
    this._leadsService.updateLead(this.leadDetails).subscribe(
      (res) => {
        this.isLoading = false;  
        this.notify.success("Updated Successfully");
        this.toggleEdit(); 
      },
      (error) => {
        this.isLoading = false;
       
      }
    );
  }
  
  removeSpaces(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.noteDetail.note = input.value.trim();
  
}
backToList()
{
  this.router.navigate(["app/leads"]);
}
validateNumberInput(event: KeyboardEvent) {
  const char = event.key;
  if (!/^\d$/.test(char)) {
    event.preventDefault();
  }
}
}







