import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@node_modules/@angular/router';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { GetMeetingDTO, GetMeetingDTOPagedResultDto,  MeetingScheduleServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';


class PagedMeetingScheduleRequestDto extends PagedRequestDto {
  keyword: string;
}
@Component({
  selector: 'app-meeting-schedule',
  templateUrl: './meeting-schedule.component.html',
  styleUrls: ['./meeting-schedule.component.css']
})
export class MeetingScheduleComponent extends PagedListingComponentBase<GetMeetingDTO> {
   meetings = [];
   keyword = '';
   isTableLoading = false;
   dateRange = {
     start: moment().startOf('month'),
     end: moment().endOf('month')
   };
   isFirstCall = false;
   modalContent: { title: string; content: string } = { title: '', content: '' };
   popupContentIndex: number;
  leadId: number;
  skipCount : any = 0
  totalRecords : any
  maxResultCount : any =10
   
  constructor(
    injector: Injector,
    private _meetingService: MeetingScheduleServiceServiceProxy,    
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
        const leadId = params['LeadId'];
        if (leadId) {
          this.leadId = Number(leadId); // Set phone number to keyword for filtering
          //this.getDataPage(1); // Fetch the call history
          this.getAllMeetings();
        }
        else{
          this.getAllMeetings();
          //this.refresh();
        }
      });
    }
  
    protected delete(entity: GetMeetingDTO): void {
      // Delete functionality for call history (if applicable)
    }
  
    onDateRangeChanged(range: { start: moment.Moment; end: moment.Moment }): void {
      this.dateRange = range;
      this.getDataPage(1);  // Fetch the data again with the updated date range
    }
   
  
    protected list(
      request: PagedMeetingScheduleRequestDto,
      pageNumber: number,
      finishedCallback: Function
    ): void {
      if(!this.isFirstCall){
        this.isFirstCall = true;
        return;
      }
      request.keyword = this.keyword;
  
      //this.getAllMeetings(request, finishedCallback, pageNumber);
    }

   getAllMeetings(data?) {
    this._meetingService
      .getAllMeetings(this.keyword, this.leadId, this.dateRange.start, this.dateRange.end, undefined,
        this.skipCount, this.maxResultCount)
     
      .subscribe((result: GetMeetingDTOPagedResultDto) => {
        this.meetings = result.items;
        this.totalRecords = result.totalCount;
        //this.showPaging(result, pageNumber);
      });
  }
  onFilterChange()
  {
    this.getAllMeetings();
  }
  onClear()
  {
   this.keyword = '';
  this.getAllMeetings();
  }
  meetingDetails(event)
  {
    this.skipCount = event.skipCount;
    this.maxResultCount = event.rows;
    this.keyword = event.keyword
    this.getAllMeetings();
  }
}
