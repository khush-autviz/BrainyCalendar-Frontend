import { Component, Injector, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { BackgroundSchedulerServiceServiceProxy, DateRangeDTO, Lead, LeadDtoPagedResultDto, LeadServiceServiceProxy, PagedLeadResultRequestDto, PropertyPurposeEnum } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { Router } from '@node_modules/@angular/router';
import { CallMeetingEnumStatus, CallProviderEnumState, LeadSourceEnumState, LeadStatusEnumState } from '@shared/AppEnums';
import { CommonService } from '@shared/commonservice/common-logic.service';
import { BsModalRef, BsModalService } from '@node_modules/ngx-bootstrap/modal';
import { UploadLeadsComponent } from './upload-leads/upload-leads.component';
import { timeStamp } from 'console';
import { AppComponentBase } from '@shared/app-component-base';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { DatePipe } from '@node_modules/@angular/common';

class PagedCallsRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css'],
  providers: [DatePipe]
})
export class LeadsComponent extends AppComponentBase implements OnInit {
  Leads = [];
  checkList = [];
  allCheck = false;
  isTableLoading = false;
  skipCount: any = 0
  maxResultCount: any = 10
  totalRecords: any
  keyword = '';
  isLoading = false;
  dateRange = {
    start: moment().startOf('month'),
    end: moment().endOf('month')
  };
  first: any
  propertyPurpose: PropertyPurposeEnum = 0;
  callMeetingEnumStatus = CallMeetingEnumStatus
  selectedLeadStatus = undefined;
  selectedLeadSource = undefined;
  LeadSource = LeadSourceEnumState;
  LeadStatus = LeadStatusEnumState;
  modalRef: BsModalRef | undefined;

  isFirstCall = false;
  isRetellCallProvided = this.appSession.tenant.callProvider == CallProviderEnumState.Retell
  constructor(injector: Injector, private _leadsService: LeadServiceServiceProxy,
    private router: Router, private commonservice: CommonService,
    private modalService: BsModalService, private backgroundLead: BackgroundSchedulerServiceServiceProxy,
    private datePipe: DatePipe) {
    super(injector);
  }
  ngOnInit(): void {
    //this.getAll();
  }
  protected delete(entity: Lead): void {
    // Delete functionality for call history (if applicable)
  }

  onDateRangeChanged(range: { start: moment.Moment; end: moment.Moment }): void {
    this.dateRange = range;
    //this.getDataPage(1);  
    this.getAll();
  }



  getAll() {
    if (!this.isFirstCall) {
      console.log("firstcall")
      this.isFirstCall = true;
      return;
    }
    const status = this.selectedLeadStatus ?? null;
    const source = this.selectedLeadSource ?? null;
    const finalSource = source === undefined || source === null ? "" : source;
    const finalStatus = status === undefined || status === null ? "" : status;
    this.isLoading = true;
    this._leadsService.getAllLeads(this.keyword, this.propertyPurpose, this.dateRange.start, this.dateRange.end, finalSource, finalStatus, this.skipCount, this.maxResultCount).subscribe((res) => {
      this.Leads = res.items;
      this.totalRecords = res.totalCount;
      this.commonservice.sendSignals();
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    })
  }
  viewCallLogs(leadId) {
    // Pass the phoneNumber as a query parameter
    this.router.navigate(['app/inbound-call'], { queryParams: { leadId: leadId } });
  }
  viewMeetings(id: number) {
    this.router.navigate(['app/meeting-schedule'], { queryParams: { LeadId: id } });
  }
  addLead() {
    let createPropertyDialog = this.modalService.show(UploadLeadsComponent, {
      class: 'modal-lg',
    });

  }
  addLeadPopup() {
    let modalRef = this.modalService.show(AddLeadComponent, {
      class: 'modal-lg',  // Optional: Set modal size
    });

    // Listen to the leadSaved event emitted by the AddLeadComponent

    modalRef.content.leadSaved.subscribe((savedLead) => {
      this.getAll();
    });

  }
  checkUnCheckAll() {
    if (this.allCheck == true) {
      this.allCheck = false;
      this.checkList = []
    }
    else {
      this.allCheck = true;
      this.checkList = []
      for (let i of this.Leads) {
        this.checkList.push(i.id)
      }
    }
  }
  checkID(i: any) {
    var index = this.checkList.indexOf(i)
    if (index != -1) {
      this.checkList.splice(index, 1)
      this.allCheck = false
      // console.log(this.checkList)
    }
    else {
      this.checkList.push(i)
      if (this.checkList.length >= 10) {
        this.allCheck = true
      }
      else {
        this.allCheck = false
      }
      // console.log(this.checkList)
    }
  }

  bulkCall() {
    if (!this.checkList.length) {
      this.notify.info("Kindly select a lead to call");
      return;
    }
  
    this.backgroundLead.callingOnLeadId(this.checkList).subscribe({
      next: (res) => {
        this.notify.info("Call Enqueue");
      },
      error: (err) => {
        this.notify.error(err.error?.message || "Call limit exceeded! You can only make one more call.");
      }
    });
  }
  exportExcel() {
    const status = this.selectedLeadStatus ?? null;
    const source = this.selectedLeadSource ?? null;
    const finalSource = source === undefined || source === null ? "" : source;
    const finalStatus = status === undefined || status === null ? "" : status;

    var inputExportedData = new PagedLeadResultRequestDto();
    inputExportedData.dateRange = new DateRangeDTO();
    inputExportedData.dateRange.startDate = this.dateRange.start;
    inputExportedData.dateRange.endDate = this.dateRange.end;
    inputExportedData.leadSource = finalSource;
    inputExportedData.leadsStatus = finalStatus;
    inputExportedData.keyword = this.keyword;
    inputExportedData.maxResultCount = this.maxResultCount;
    inputExportedData.skipCount = this.skipCount;
    inputExportedData.propertyPurpose = this.propertyPurpose;

    this.backgroundLead.exportLead(inputExportedData).subscribe(res => {
      abp.notify.info("Excel will be send over mail in 2 minutes", '', {
        position: 'top-right', // 'top-center' will center the notification on top
        closeButton: true, // Optionally, enable a close button
        hideAfter: 5000 // Optional: Set how long the notification should stay (in milliseconds)
      });
    })
  }
  viewLeadDetails(leadId: number, phoneNumber: string) {

    this.router.navigate(['app/lead-details'], { queryParams: { leadId: leadId } });
  }
  onFilterChange() {
    if (!this.isFirstCall) {
      this.isFirstCall = true;
      return;
    }
    this.getAll();


  }
  onClear() {
    this.selectedLeadSource = undefined;
    this.selectedLeadStatus = undefined;
    this.keyword = ''
    this.dateRange = {
      start: moment().startOf('month'),
      end: moment().endOf('month')
    }
    this.getAll();

  }
  leadsDetails(event) {
    this.skipCount = event.first;
    this.maxResultCount = event.rows;

    this.getAll();
  }
  getModifiedDate(date?: any): string {
    return date
      ? `${this.datePipe.transform(date, 'd MMM, y')} ${this.datePipe.transform(date, 'hh:mm:ss a')}`
      : '--';
  }

}
