import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from '@node_modules/moment-timezone';
import { MeetingScheduleServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import Calendar from 'tui-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendarContainer', { static: true }) calendarContainer!: ElementRef;
  calendar!: Calendar;
  localStorageKey = 'tuiCalendarEvents';
    dateRange = {
      start: moment().startOf('isoWeek').toISOString(), // Monday at 00:00:00
      end: moment().endOf('isoWeek').toISOString() // Sunday at 23:59:59
  };
  meetings= []

  constructor(
      public meetingService: MeetingScheduleServiceServiceProxy,
      // public googleService: ServiceProxy,
      // public notifyService: NotifyService,
      // public callConfigurationService: CallConfigurationServiceProxy,
      // private router: Router
    ) { }

  ngAfterViewInit(): void {
    this.calendar = new Calendar(this.calendarContainer.nativeElement, {
      defaultView: 'month',
      taskView: true,
      scheduleView: true,
      useCreationPopup: true, // Enables built-in creation modal
      useDetailPopup: true,   // Enables built-in edit modal
    });

    this.loadEventsFromLocalStorage();
    this.loadMeetings()

    // Event Listeners
    this.calendar.on('beforeCreateSchedule', (event) => this.createEvent(event));
    this.calendar.on('beforeUpdateSchedule', (event) => this.updateEvent(event));
    this.calendar.on('beforeDeleteSchedule', (event) => this.deleteEvent(event));
  }

  //Load Events from Local Storage
  loadEventsFromLocalStorage() {
    const storedEvents = this.getStoredEvents();
    if (storedEvents.length > 0) {
      this.calendar.createSchedules(storedEvents);
    }
  }

  //Save Events to Local Storage
  saveEventsToLocalStorage(events: any[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(events));
  }

  //Create Event 
  createEvent(event: any) {
    const newEvent = {
      id: String(Date.now()), 
      calendarId: '1',
      title: event.title,  // Comes from built-in modal
      category: 'time',
      start:new Date(event.start).toISOString(),
      end: new Date(event.end).toISOString(),
    };

    let events = this.getStoredEvents();
    events.push(newEvent);
    this.saveEventsToLocalStorage(events);

    this.calendar.createSchedules([newEvent]);
  }

  // Update Event 
  updateEvent(event: any) {
    let events = this.getStoredEvents();
    const index = events.findIndex(e => e.id === event.schedule.id);

    if (index !== -1) {
      events[index] = {
        ...events[index],
        title: event.changes.title || events[index].title,
        start: event.changes.start ? new Date(event.changes.start).toISOString() : events[index].start,
        end: event.changes.end ? new Date(event.changes.end).toISOString() : events[index].end,
      };

      this.saveEventsToLocalStorage(events);
      this.calendar.updateSchedule(event.schedule.id, event.schedule.calendarId, event.changes);
    }
  }

  // Delete Event
  deleteEvent(event: any) {
    let events = this.getStoredEvents().filter(e => e.id !== event.schedule.id);
    this.saveEventsToLocalStorage(events);
    this.calendar.deleteSchedule(event.schedule.id, '1');
  }

  //Get Stored Events
  getStoredEvents(): any[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }


  public loadMeetings(): void {
      // this.isLoading = true
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
            // this.isLoading = false
            this.meetings = result.items || [];
            // this.populateSchedulerEvents();
            console.log(this.meetings);
            
          },
          (error) => {
            // this.isLoading = false
            console.error('Error fetching meetings:', error);
          }
        );
    }


}
