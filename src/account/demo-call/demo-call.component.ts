import { Component } from '@angular/core';
import { ServiceProxy, DemoCallDTO } from '@shared/service-proxies/service-proxies';
import { CommonService } from '@shared/commonservice/common-logic.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-demo-call',
  templateUrl: './demo-call.component.html',
  styleUrls: ['./demo-call.component.css']
})
export class DemoCallComponent {
  demoCall: DemoCallDTO = new DemoCallDTO();
  isLoading = false;
  countryCodes = [];
  selectedCountryCode: any = "+91";
  customerNumber: any;
  showModal: boolean = false;
  constructor(private callService: ServiceProxy, public commonService: CommonService) {
    this.countryCodes = this.commonService.countries;
  }

  enqueueCall() {
    this.customerNumber = this.customerNumber.replace(/[\s-]/g, '');
    if (this.customerNumber && this.demoCall.customerName) {
      this.isLoading = true;
      this.demoCall.customerNumber = this.selectedCountryCode + this.customerNumber;
      this.showModal = true;
      this.callService.demo(this.demoCall).subscribe(
        res => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Call Enqueued',
          });
          this.demoCall.customerNumber = this.demoCall.customerNumber.replace(this.selectedCountryCode, "");
          this.isLoading = false;
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while enqueuing the call.',
          });
          this.demoCall.customerNumber = this.demoCall.customerNumber.replace(this.selectedCountryCode, "");
          this.isLoading = false;
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'An error occurred while enqueuing the call.',
      });
      this.demoCall.customerNumber = this.demoCall.customerNumber.replace(this.selectedCountryCode, "");
      this.isLoading = false;
    }
  }
  moveCursorToStart(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    setTimeout(() => {
      if (input.setSelectionRange) {
        input.setSelectionRange(0, 0); // Move cursor to the start
      }
    });
  }


  closeImageUploadModal(): void {
    this.showModal = false;
    // this.selectedImage = null;
  }
}
