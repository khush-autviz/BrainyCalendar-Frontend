import { Component, Injector, ChangeDetectorRef, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {  CallDTO, CallDTOPagedResultDto, CallEnum, CallServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { CallEnumState } from '@shared/AppEnums';
import { error } from 'console';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@node_modules/@angular/router';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/app-component-base';


class PagedCallsRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './inbound.component.html',
  styleUrls: ['./inbound.component.scss'],
  animations: [appModuleAnimation()]
})
export class InboundComponent extends AppComponentBase implements OnInit {
  calls = [];
  keyword = '';
  selectedTab: CallEnum = undefined;
  isTableLoading = false;
  totalItems: any;
  skipCount: any = 0
  maxResultCount: any = 0
  dateRange = {
    start: moment().startOf('month'),
    end: moment().endOf('month')
  };
  isFirstCall = false;
  callingType = CallEnumState
  bsModalRef: BsModalRef;
  modalContent: { title: string; content: string } = { title: '', content: '' };
  popupContentIndex: number;
  callDetails: any = {};
  leadId = 0;
  isLoading = false;
  

  constructor(
    injector: Injector,
    private _callService: CallServiceServiceProxy,
    private _modalService: BsModalService,
    private router: Router,
    cd: ChangeDetectorRef,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params) => {
      this.leadId = params['leadId'];
      this.getCallLogsInsights();
    });
   
    
  }

  protected delete(entity: CallDTO): void {
    // Delete functionality for call history (if applicable)
  }

  onDateRangeChanged(range: { start: moment.Moment; end: moment.Moment }): void {
    this.dateRange = range;
    this.getCalls();  // Fetch the data again with the updated date range
  }
  onTabChange(tab): void {
    this.selectedTab = tab;
    // this.refresh();
  }


  getCalls() {
    if (!this.isFirstCall) {
      this.isFirstCall = true;
      return;
    }
    this.isLoading= true
    this._callService
      .getAllCalls(this.keyword, this.selectedTab, this.dateRange.start, this.dateRange.end, this.leadId,
        this.skipCount, this.maxResultCount).subscribe((res) => {
         this.isLoading = false;
          this.calls = res.items;
          this.totalItems = res.totalCount;
        }),
        (error) => {
          this.isLoading = false;
         
        }
  }
  fetchRecording(callDetails) {
    this.isLoading = true;
    this._callService.getRecording(callDetails.id).subscribe(data => {
        this.isLoading = false;
        if (data) {
          callDetails['audio'] = data;         
        }
      }, error => {
        this.isLoading = false;
      })
  }
  
  getCallLogsInsights(): void {
    
    this.isLoading = true;
    
    this._callService.getCallLogsInsights(this.keyword,this.selectedTab,this.dateRange.start,
      this.dateRange.end,this.leadId
    ).subscribe({
      next: (res) => {
        this.callDetails = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }
  viewCallDetails(callId: string) {

    this.router.navigate(['app/call-details'], { queryParams: { callId: callId } });
  }
  onFilterChange(event) {
    this.getCalls();
  }
  onClear() {
    this.keyword = '';
    this.getCalls();
  }
  callingDetails(event) {
    this.skipCount = event.first;
    this.maxResultCount = event.rows;
    this.getCalls();
  }
  removeSpecialCharacters(call) {
    call.transcript.forEach(element => {
      element.text = element.text.replace("<", '').replace(">", ''); 
    }); 
    
  }
}