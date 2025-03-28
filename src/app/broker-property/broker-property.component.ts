import { Component, OnInit, TemplateRef } from '@angular/core';
import { BrokerPropertyDTOPagedResultDto, BrokerPropertyServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddBrokerPropertyComponent } from './add-broker-property/add-broker-property.component';
import { PagedResultDto } from '@shared/paged-listing-component-base';
import { Router } from '@node_modules/@angular/router';

@Component({
  selector: 'app-broker-property',
  templateUrl: './broker-property.component.html',
  styleUrls: ['./broker-property.component.css']
})
export class BrokerPropertyComponent implements OnInit {
  properties: any[] = []; // Replace `any` with the property model type
  totalCount: number = 0;
  pageSize: number = 10;
  pageNumber: number = 1;
  keyword: string = ''; // Optional filter
  totalPages: number = 0;

  constructor(private propertyService: BrokerPropertyServiceServiceProxy, private modalService: BsModalService, private router: Router) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  // Load properties with server-side pagination
  loadProperties(): void {
    const skipCount = (this.pageNumber - 1) * this.pageSize;

    this.propertyService.getAllProperties(this.keyword, skipCount, this.pageSize)
      .subscribe((result: BrokerPropertyDTOPagedResultDto) => {
        this.properties = result.items;
        this.totalCount = result.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
      });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.loadProperties();
  }

  getPaginationNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Optional: Filter by keyword
  onSearch(): void {
    this.pageNumber = 1; // Reset to the first page
    this.loadProperties();
  }
  addproperty(): void {
    let createPropertyDialog = this.modalService.show(AddBrokerPropertyComponent, {
      class: 'modal-lg',
    });

    createPropertyDialog.content.onSave.subscribe(() => {
      this.loadProperties();
    });
  }
  viewPropertyDetails(propertyId: number): void {
    this.router.navigate(['app/property-details', propertyId]);
  }
}