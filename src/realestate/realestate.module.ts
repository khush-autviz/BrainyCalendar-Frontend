import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppRoutingModule } from '../app/app-routing.module';
import { ServiceProxyModule } from '../shared/service-proxies/service-proxy.module';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrokerPropertyComponent } from '../app/broker-property/broker-property.component';
import { AddBrokerPropertyComponent } from '../app/broker-property/add-broker-property/add-broker-property.component';
import { LeadsComponent } from '../app/leads/leads.component';
import { PropertyDetailsComponent } from '@app/broker-property/property-details/property-details.component';
import { MeetingScheduleComponent } from 'app/meeting-schedule/meeting-schedule.component';




@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     HttpClientJsonpModule,
     ModalModule.forChild(),
     BsDropdownModule,
     CollapseModule,
     TabsModule,
     AppRoutingModule,
     ServiceProxyModule,
     SharedModule,
     NgxPaginationModule,
     ModalModule.forRoot(),
   
  ],
  exports: [],
})
export class RealestateModule { }
