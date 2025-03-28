import { Component, Input } from '@angular/core';
import { NotifyService } from '@node_modules/abp-ng2-module';
import { CountryServiceServiceProxy, PurchasedNumberServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { error } from 'console';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css']
})
export class PhoneNumberComponent {

  phoneNumbers = [];
  selectedCountryId: number = null;
  searchByDigitOrPhrase = "";
  countries = [];
  cols: 10
  isLoading = false;
  constructor(private purchasePhoneNumberService: PurchasedNumberServiceServiceProxy,
    private countryService: CountryServiceServiceProxy, private notifyService: NotifyService) {
  }
  ngOnInit() {
    this.getAllCountry();
  }


  getAllCountry() {
    this.countryService.getAllCountries().subscribe(res => {
      this.countries = res;
    })
  }

  getAllAvailablePhoneNumber() {
    if (!this.selectedCountryId) {
      this.notifyService.error("Kindly select a country");
      return;
    }
    this.isLoading = true;
    this.purchasePhoneNumberService.getAvailableNumbers(this.selectedCountryId, this.searchByDigitOrPhrase).subscribe(res => {
      this.phoneNumbers = res;
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    })
  }
  purchaseCall(phnNumber) {
    this.isLoading=true
    this.purchasePhoneNumberService.purchasedNumber(this.selectedCountryId, phnNumber).subscribe(res => {
      this.notifyService.info("Number Purchased");
      this.isLoading=false
    }),
    (error)=>{
      this.isLoading=false
    }
  }
  onClear() {
    this.searchByDigitOrPhrase = ''
    this.getAllAvailablePhoneNumber();
  }

}
