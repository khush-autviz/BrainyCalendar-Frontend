import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-prime-table',
  templateUrl: './prime-table.component.html',
  styleUrls: ['./prime-table.component.css']
})
export class PrimeTableComponent {
  @Input() data: any[] = []; // Data for the table
  @Input() columns: TableColumn[] = []; // Columns configuration
  @Input() paginationConfig: PaginationConfig = { pageSize: 10, totalRecords: 0 }; // Pagination configuration
  @Input() loading: boolean = false; // Show loader when true

  @Output() lazyLoad = new EventEmitter<PaginationEvent>(); // Event emitter for pagination

  // Triggered when a user interacts with pagination
  onLazyLoad(event: any) {
    this.lazyLoad.emit({
      pageNumber: event.first / event.rows + 1,
      pageSize: event.rows,
    });
  }
}
export interface TableColumn {
  field: string; // Field name in the data
  header: string; // Column header
  type:string;
  customTemplate?: any; // Optional custom template for column
}

export interface PaginationConfig {
  pageSize: number; // Number of rows per page
  totalRecords: number; // Total number of rows
}

export interface PaginationEvent {
  pageNumber: number; // Current page number
  pageSize: number; // Rows per page
}