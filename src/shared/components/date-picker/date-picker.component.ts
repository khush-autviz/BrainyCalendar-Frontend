import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class CommonDatePickerComponent {
  @Input() selectedDateRange: { start: moment.Moment; end: moment.Moment } = {
    start: moment().startOf('month'),
    end: moment().endOf('month')
  };
  @Output() dateRangeChange = new EventEmitter<{ start: moment.Moment; end: moment.Moment }>();

  ranges = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };

  constructor() {}

  ngOnInit(): void {}

  onDateRangeChange(event): void {    
    this.dateRangeChange.emit(this.selectedDateRange);
  }
}
