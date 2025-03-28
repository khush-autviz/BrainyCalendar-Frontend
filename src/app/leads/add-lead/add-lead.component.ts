import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { BsModalRef } from '@node_modules/ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { CommonService } from '@shared/commonservice/common-logic.service';
import { CountryServiceServiceProxy, Lead, LeadDto, LeadServiceServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.css']
})
export class AddLeadComponent extends AppComponentBase {
  displayAddLeadModal: boolean = true;
  lead:Lead=new Lead();
  countryCodes = [];
  customerNumber:number;
  isLoading=false;
  selectedCountryCode: any;
  @Output() leadSaved: EventEmitter<any> = new EventEmitter();  // EventEmitter to notify parent component

  constructor(public injector: Injector, public bsModalRef: BsModalRef,
  public commonService: CommonService,
      private leadService: LeadServiceServiceProxy) { super(injector) }
      saveLead() {        
        
         if (this.isValidLead(this.lead)) {
          this.isLoading=true;
          this.lead.customerPhoneNumber= `${this.selectedCountryCode}${this.customerNumber}`;
          this.lead.source = 0;
          this.lead.leadStatus = 0;
          this.leadService.insertLead(this.lead).subscribe(
            (res) => {
              this.notify.success("Lead saved successfully");
              this.leadSaved.emit(res);              
              this.bsModalRef.hide();
              this.isLoading = false;
            },
            (error) => {
              this.notify.error("Lead not saved");
             this.isLoading = false;
            }
          );
        }
      }
      ngOnInit()
      {
        this.getCountries();
      }   
  cancel() {
    this.bsModalRef.hide(); 
  }
  
  getCountries() {
    this.countryCodes = this.commonService.countries;
    let selectedCountry = this.commonService.countries.find(x=>x.countryName == this.appSession.user.country);
    if(selectedCountry?.phoneCode){
      this.selectedCountryCode = selectedCountry.phoneCode;
    }
  }
  isValidLead(lead: any): boolean {
    return lead.customerName && this.customerNumber && lead.customerEmail;
  }
  close(): void {
    this.bsModalRef.hide();
  }

  validateNumberInput(event: KeyboardEvent) {
    const char = event.key;
    if (!/^\d$/.test(char)) {
      event.preventDefault();
    }
  }
  
} 
