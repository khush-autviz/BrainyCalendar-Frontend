import { Component, OnInit } from '@angular/core';
import { PaginationEvent, TableColumn } from '@shared/prime-table/prime-table.component';
import { PaymentServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { error } from 'console';

@Component({
  selector: 'app-billing-transaction',
  templateUrl: './billing-transaction.component.html',
  styleUrls: ['./billing-transaction.component.css']
})
export class BillingTransactionComponent implements OnInit{
  transactions: any[] = [];
  columns: TableColumn[] = [];
  isLoading :boolean=false
  paginationConfig = { pageSize: 10, totalRecords: 0 };
  loading = false;

  constructor(private _paymentservice : PaymentServiceServiceProxy) {}


  ngOnInit(): void {
      this.columns = [
        { field: 'amountWithSymbol', header: 'Amount', type: 'string' },
        { field: 'formateDate', header: 'Date', type: 'string' },
        { field: 'status', header: 'Status', type: 'string' },
        { field: 'type', header: 'Type', type: 'string' }
      ];
    this.loadData({ pageNumber: 1, pageSize: 10 });
  }
  loadData(event: PaginationEvent): void {
    this.loading = true;
    this._paymentservice.getAllTransaction(event.pageNumber,event.pageSize).subscribe((result) => {
      this.transactions = result.items;
      this.transactions.forEach(t => {
        t["amountWithSymbol"] = `$${t.amount}`  
        t["type"] = t["type"] == "subscription_create"? "Subscription purchased": t["type"];
        t["status"] = t["status"] 
        ? t["status"].charAt(0).toUpperCase() + t["status"].slice(1) 
        : "";
        t["formateDate"] = t["date"].format('DD MMM, YYYY hh:mm:ss A');
      });
      this.paginationConfig.totalRecords = result.totalCount;
      this.loading = false;
    }),
    (error)=>{
      this.isLoading=false
    }

  }
}
