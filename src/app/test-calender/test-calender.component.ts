import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment-timezone';
import { MeetingSchedule, MeetingSchedulerDTO, MeetingScheduleServiceServiceProxy } from '@shared/service-proxies/service-proxies';
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
  isEditModalOpen = false;
  isLoading: boolean = false
  newEvent = { description: '', start: '', end: '' };
  editedEvent = { id: '', description: '', start: '', end: '' };
  dateRange = {
    start: moment().startOf('isoWeek').toISOString(),
    end: moment().endOf('isoWeek').toISOString()
  };
  meetings = [];
  currentDateLabel: String = ''
  
  constructor(public meetingService: MeetingScheduleServiceServiceProxy, private cdr: ChangeDetectorRef, public notifyService: NotifyService,) {}


  // executes on first render
  ngAfterViewInit(): void {
    this.calendar = new Calendar(this.calendarContainer.nativeElement, {
      defaultView: 'week',
      taskView: true,
      scheduleView: true,
      useCreationPopup: false,
      useDetailPopup: false,   // false for custom edit modal
      week: {
        startDayOfWeek: 1 
      },
      month: {
        startDayOfWeek: 1
      }
    });

    this.calendar.on('beforeCreateSchedule', (event) => {
      this.openCustomEventPopup(event.start, event.end);
    });

    this.calendar.on('clickSchedule', (event) => {
      this.openEditModal(event.schedule);
    });

    this.loadEvents();
    this.changeView('month')
    this.updateDateLabel()
  }

  // change view day, week, month
  changeView(view: 'day' | 'week' | 'month') {
    this.calendar.changeView(view)
    this.updateDateLabel()
  }

// navigate between dates
  navigate(action: 'prev' | 'next' | 'today') {
    if (action === 'prev') {
      this.calendar.prev();
    } else if (action === 'next') {
      this.calendar.next();
    } else if (action === 'today') {
      this.calendar.today();
    }
  
    this.updateDateLabel(); 
  }

  //update the dates while navigating
  updateDateLabel() {
    const view = this.calendar.getViewName()
    const date = this.calendar.getDate()

    if (view === 'month') {
      this.currentDateLabel = moment(date.toDate()).format('MMMM YYYY')
    }
    else if (view === 'week') {
      const startOfWeek = moment(date.toDate()).startOf('isoWeek').format('DD MMM YYYY')
      const endOfWeek = moment(date.toDate()).endOf('isoWeek').format('DD MMM YYYY')
      this.currentDateLabel = `${startOfWeek} - ${endOfWeek}`
    }
    else {
      this.currentDateLabel = moment(date.toDate()).format('ddd, D MMM YYYY')
    }
  }

  // Modal for create event
  openCustomEventPopup(start: Date, end: Date) {
    this.newEvent = { description: '', start: '', end: '' };
    this.newEvent.start = moment(start).format('YYYY-MM-DDTHH:mm');
    this.newEvent.end = moment(end).format('YYYY-MM-DDTHH:mm');

    setTimeout(() => {
      this.isModalOpen = true;
      this.cdr.detectChanges();
    }, 0);
  }

  // modal for update event 
  openEditModal(event) {
    console.log('edit', event);
    this.editedEvent = {
      id: event.id,
      description: event.description ?? 'no title',
      start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
    };
    this.isEditModalOpen = true;
    this.cdr.detectChanges(); // Ensure UI updates
  }


  // Create events
  createEvent() {
     let newMeeting = new MeetingSchedule();
        newMeeting.scheduleDateTime = moment(this.newEvent.start);
        newMeeting.description = this.newEvent.description;
        this.isLoading = true;
    
        this.meetingService.insertMeeting(newMeeting)
          .subscribe(
            (response) => {
              this.isLoading = false;
              console.log(response, "create");  
              this.loadEvents();
              this.notifyService.success("Meeting scheduled successfully");
              this.modalClose()
            },
            (error) => {
              this.isLoading = false;
              this.notifyService.error("Error scheduling meeting");
            }
          );
  }


  // update events (edit)
  updateEvent() {
    
    let updatedEvent = new MeetingSchedulerDTO();
    updatedEvent.id = Number(this.editedEvent.id);
    updatedEvent.startDate = moment(this.editedEvent.start);
    updatedEvent.description = this.editedEvent.description;

    this.isLoading = true
    this.meetingService.updateMeetingSchedule(updatedEvent)
      .subscribe(
        (response) => {
          this.isLoading = false
          this.notifyService.success('Meeting schedule updated successfully');
          this.loadEvents()
          this.closeEditModal()
        },
        (error) => {
          this.isLoading = false
          this.notifyService.error('Error updating meeting schedule');
        }
      );
  }

  // closes create event modal
  modalClose() {
    this.isModalOpen = false;
    this.newEvent = { description: '', start: '', end: '' };

    if (this.calendar) {
      // Switch views to force UI reset without losing events
      const currentView = this.calendar.getViewName();
      this.calendar.changeView('day'); // Temporarily switch view
      this.calendar.changeView(currentView); // Switch back to original view
    }
    this.cdr.detectChanges();
  }


  // close update event modal
  closeEditModal() {
    this.isEditModalOpen = false;
    this.editedEvent = { id: '', description: '', start: '', end: '' };
    this.cdr.detectChanges();
  }

//  get events (Read)
  public loadEvents(): void {
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
          bgColor: 'red'
        }));
        this.calendar.createSchedules(formattedMeetings); 
        console.log("meetings",this.meetings);
          console.log("formatted",formattedMeetings);
          
        },
        (error) => {
          this.isLoading = false
          console.error('Error fetching meetings:', error);
        }
      );
  }

  deleteEvent() {
      this.meetingService.deleteMeeting(Number(this.editedEvent.id)).subscribe(
        (response) => {
          this.notifyService.success("Meeting deleted successfully");
          this.closeEditModal()
        },
        (error) => {
          this.notifyService.error("Error deleting meeting");
        }
      );
    console.log("Delete");
    
  }

}
