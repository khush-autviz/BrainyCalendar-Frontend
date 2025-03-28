import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment-timezone';
import { MeetingSchedule, MeetingScheduleServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import Calendar from 'tui-calendar';
import { NotifyService } from '@node_modules/abp-ng2-module';


@Component({
  selector: 'app-test-calender',
  templateUrl: './test-calender.component.html',
  styleUrls: ['./test-calender.component.css']
})
export class TestCalenderComponent implements AfterViewInit {
  
  @ViewChild('calendarContainer', { static: true }) calendarContainer!: ElementRef;
  calendar!: Calendar;
  isModalOpen = false;
  isLoading: boolean = false
  
  newEvent = { title: '', description: '', start: '', end: '' };

  dateRange = {
    start: moment().startOf('isoWeek').toISOString(),
    end: moment().endOf('isoWeek').toISOString()
  };
  
  meetings = [];

    
    constructor(public meetingService: MeetingScheduleServiceServiceProxy, private cdr: ChangeDetectorRef, public notifyService: NotifyService,) {}

  ngAfterViewInit(): void {
    this.calendar = new Calendar(this.calendarContainer.nativeElement, {
      defaultView: 'month',
      taskView: true,
      scheduleView: true,
      useCreationPopup: false,
      useDetailPopup: true,
    });

    this.calendar.on('beforeCreateSchedule', (event) => {
      this.openCustomEventPopup(event.start, event.end);
    });

    // this.calendar.render();
    this.loadMeetings();
    this.calendar.createSchedules([
      {
        id: String(Date.now()),
        calendarId: '1',
        title: this.newEvent.title, // Removed quotes to use actual value
        category: 'time',
        start: moment().add(1, 'day').startOf('day').toISOString(), // Set to tomorrow's start time (00:00)
        end: moment().add(1, 'day').endOf('day').toISOString(), // Set to tomorrow's end time (23:59)
      }
    ]);

  }

  openCustomEventPopup(start: Date, end: Date) {
    this.newEvent = { title: '', description: '', start: '', end: '' };

    this.newEvent.start = moment(start).format('YYYY-MM-DDTHH:mm');
    this.newEvent.end = moment(end).format('YYYY-MM-DDTHH:mm');

    setTimeout(() => {
      this.isModalOpen = true;
      this.cdr.detectChanges();
    }, 0);
  }

  createEvent() {

     let newMeeting = new MeetingSchedule();
        newMeeting.scheduleDateTime = moment(this.newEvent.start);
        newMeeting.description = this.newEvent.description
       
        this.isLoading = true;
    
        this.meetingService.insertMeeting(newMeeting)
          .subscribe(
            (response) => {
              this.isLoading = false;
              console.log(this.newEvent.description,"descr");
              
    
              this.loadMeetings();
              this.notifyService.success("Meeting scheduled successfully");
              this.modalClose()
            },
            (error) => {
              this.isLoading = false;
              this.notifyService.error("Error scheduling meeting");
            }
          );


  }

  modalClose() {
    this.isModalOpen = false;
    this.newEvent = { title: '', description: '', start: '', end: '' };
    this.calendar.clear();
    this.cdr.detectChanges();
  }

//   loadMeetings
  public loadMeetings(): void {
    this.isLoading = true
    this.meetingService
      .getAllMeetings(
        '',
        undefined,
        moment(this.dateRange.start),
        moment(this.dateRange.end),
        undefined,
        0,
        10000
      )
      .subscribe(
        (result) => {
          this.isLoading = false
          this.meetings = result.items || [];
          // this.populateSchedulerEvents();
                  // Transform data into TUI Calendar format
        let formattedMeetings = this.meetings.map(meeting => ({
          id: String(meeting.id),
          calendarId: '1',
          title: meeting.description || 'No Title', // Use description as title
          category: 'time',
          start: moment(meeting.scheduleDateTime).toISOString(), // Convert to correct format
          end: moment(meeting.scheduleDateTime).add(1, 'hour').toISOString(), // Default 1-hour duration
        }));
          this.calendar.createSchedules(formattedMeetings); 
          console.log("meetings",this.meetings);
          

        },
        (error) => {
          this.isLoading = false
          console.error('Error fetching meetings:', error);
        }
      );
  }

}
