import { Component, OnInit } from '@angular/core';
import { CallConfigurationServiceProxy, GetMeetingDTO, MeetingSchedule, MeetingScheduleDto, MeetingSchedulerDTO, MeetingScheduleServiceServiceProxy, ServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment-timezone';
import { NotifyService } from '@node_modules/abp-ng2-module';
import { text } from 'stream/consumers';
import { Router } from '@node_modules/@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationPlateformEnumState } from '@shared/AppEnums';

declare const scheduler: any; // Declare the scheduler object

@Component({
  selector: 'app-meeting-calendar',
  templateUrl: './meeting-calendar.component.html',
  styleUrls: ['./meeting-calendar.component.css']
})
export class MeetingCalendarComponent implements OnInit {
  meetings: GetMeetingDTO[] = [];
  dateRange = {
    start: moment().startOf('isoWeek').toISOString(), // Monday at 00:00:00
    end: moment().endOf('isoWeek').toISOString() // Sunday at 23:59:59
};
  id: any
  description: any
  scheduleddatetime: any
  meetingdata: any
  isLoading: boolean = false
  calendarTypes = AuthenticationPlateformEnumState
  selectedOption: any
  option: any
  calenderreponse: any
  showDropdown: boolean = false;
  showIntegrateButton: boolean = true;

  constructor(
    public meetingService: MeetingScheduleServiceServiceProxy,
    public googleService: ServiceProxy,
    public notifyService: NotifyService,
    public callConfigurationService: CallConfigurationServiceProxy,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCalender();
    this.initializeScheduler();
    this.loadMeetings();    
  }

  private initializeScheduler(): void {
    scheduler.config.first_hour = 0; // Start the schedule from midnight (12:00 AM)
    scheduler.config.last_hour = 24; // End at 10:00 PM
    scheduler.config.scroll_hour = 8; // Scroll to 8:00 AM initially
    scheduler.config.date_format = "%Y-%m-%d %h:%i%s:%A";

    scheduler.templates.hour_scale = function (date) {
      return scheduler.date.date_to_str("%h:%A")(date);
    };
    scheduler.templates.event_date = function (date) {
      var formatFunc = scheduler.date.date_to_str("%h:%i:%A");
      return formatFunc(date);
    }

    scheduler.templates.event_text = function (start, end, event) {
      // Add logic to extract the meeting link from event.text (if it's the format you're using)
      const linkMatch = event.text.match(/href="([^"]+)"/);
      if (linkMatch) {
        return `<a href="${linkMatch[1]}" target="_blank">${event.text}</a>`; // Render link as clickable
      }
      return event.text; // Default text if no link found
    };

    scheduler.init('scheduler_here', new Date(), 'week');

    scheduler.config.lightbox.sections = [
      { name: "description", height: 20, map_to: "text", type: "textarea", focus: true },
      { name: "time", height: 72, type: "time", map_to: "auto", time_format: ["%d", "%m", "%Y", "%H:%i"] }
    ];

    scheduler.config.event_duration = 30;
    scheduler.config.auto_end_date = true;
    
    this.onMeetingChange()
    this.onMeetingSaveEvent();
    this.onMeetingDelete();
    scheduler.attachEvent("onViewChange", function() {
      var state = scheduler.getState();
      let isApiNeed  = this.dateRange.start?.split("T")[0] == moment(state.min_date).toISOString()?.split("T")[0]
       && this.dateRange.end?.split("T")[0] == moment(state.max_date).toISOString()?.split("T")[0];
      this.dateRange = { 
          start: moment(state.min_date).toISOString(),
          end: moment(state.max_date).toISOString()
      };
      if(!isApiNeed)
        this.loadMeetings();
    }.bind(this)); // Explicitly bind 'this' to the correct scope

  }

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
          this.populateSchedulerEvents();

        },
        (error) => {
          this.isLoading = false
          console.error('Error fetching meetings:', error);
        }
      );
  }

  private populateSchedulerEvents(): void {
   scheduler.clearAll();
    const events = this.meetings
      .filter((meeting) => meeting.meetingDate && moment(meeting.meetingDate).isValid())
      .map((meeting) => {
        return {
          id: meeting.id, // Include the meeting id here for reference
          text: meeting.meetingLink ? ` <a href="${meeting.meetingLink}" target="_blank">${meeting.description || ( meeting.customerName ? `Meeting with ${meeting.customerName}`: "")} 
         </a>` : ( meeting.customerName ? `Meeting with ${meeting.customerName}`: meeting.description) ,
          start_date: meeting.meetingDate.toDate(), // Start time
          end_date: meeting.meetingDate.toDate()
        };
      });

    scheduler.clearAll(); // Clear any existing events
    scheduler.parse(events, "json"); // Load new events
    scheduler.updateView(); // Refresh the calendar to display updated events

  }

  onMeetingChange() {
    scheduler.attachEvent("onEventChanged", function (id, event) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to change the meeting time?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateMeeting(event)
        } else {
          this.populateSchedulerEvents();
        }
      });
    }.bind(this));
  }

  onMeetingSaveEvent() {
    scheduler.attachEvent("onEventSave", function (id, event) {
      var duplicate = this.meetings.some(m => moment(m.meetingDate).isSame(moment(event.start_date)));
  
      if (duplicate) {
        this.notifyService.warn("A meeting is already existing on this time.");
        scheduler.cancel_lightbox(); 
        return false;
      }
  
      var meeting = this.meetings.find((m) => m.id == id);
      if (!meeting) {
        this.createMeeting(event);
      }
  
      return true;
    }.bind(this));
  }
  

  onMeetingDelete() {
    scheduler.attachEvent("onEventDeleted", function (id) {
      var ev = this.meetings.find(x => x.id == id);

      if (!ev) {
        console.log("Event was canceled or closed, not actually deleted.");
        return false; // Prevents unnecessary deletion 
      }

      this.meetingService.deleteMeeting(id).subscribe(
        (response) => {
          this.notifyService.success("Meeting deleted successfully");
        },
        (error) => {
          this.notifyService.error("Error deleting meeting");
        }
      );
      return true;
    }.bind(this));
  }

  createMeeting(event) {
    let newMeeting = new MeetingSchedule();
    newMeeting.scheduleDateTime = moment(event.start_date);
    newMeeting.description = event.text;
   
    this.isLoading = true;

    this.meetingService.insertMeeting(newMeeting)
      .subscribe(
        (response) => {
          this.isLoading = false;

          this.loadMeetings();
          this.notifyService.success("Meeting scheduled successfully");
        },
        (error) => {
          this.isLoading = false;
          this.notifyService.error("Error scheduling meeting");
        }
      );
  }

  updateMeeting(event) {
    let updatedEvent = new MeetingSchedulerDTO();
    updatedEvent.id = event.id;
    updatedEvent.startDate = moment(event.start_date);
    updatedEvent.description = event.text;

    this.isLoading = true
    this.meetingService.updateMeetingSchedule(updatedEvent)
      .subscribe(
        (response) => {
          this.isLoading = false
          this.notifyService.success('Meeting schedule updated successfully');
          this.loadMeetings()
        },
        (error) => {
          this.isLoading = false
          this.notifyService.error('Error updating meeting schedule');
        }
      );
  }



  GetOutlookOrgoogleUser() {
    this.isLoading = true
    this.callConfigurationService.getOutlookOrGoogle(this.selectedOption).subscribe((res) => {
      this.option = res;
      this.isLoading = false
    }),
      (error) => {
        this.isLoading = false
      }
  }

  Integrate() {
    this.router.navigate(['/app/integration'], { queryParams: { value: 'True' } })
  }

  getCalender() {

    this.callConfigurationService.getUserCalendarIntegration().subscribe((res) => {
      this.calenderreponse = res
      if (this.calenderreponse.length === 0) {
        this.showIntegrateButton = true;
        this.showDropdown = false;
      } else if (this.calenderreponse.length === 2) {
        this.showDropdown = true;
        this.showIntegrateButton = false;
      } else {
        this.showDropdown = false;
        this.showIntegrateButton = false;
      }
    })
  }
  ngAfterViewInit() {
    const tabs = document.querySelectorAll(".dhx_cal_tab");
  
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        tabs.forEach((t) => t.classList.remove("active"));
        
        // Add active class to the clicked tab
        this.classList.add("active");
      });
    });
  }
  
}