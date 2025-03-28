import { useAnimation } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { PromptsComponent } from '@app/prompts/prompts.component';
import { VoicesComponent } from '@app/voices/voices.component';
import { CallProviderEnumState, PromptTypeEnumState } from '@shared/AppEnums';
import { CommonService } from '@shared/commonservice/common-logic.service';
import { CallProviderEnum, CallServiceServiceProxy, IndustryPromptDto, IndustryPromptServiceProxy, PromptTypeEnum, SendCallDTO } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generate-call',
  templateUrl: './generate-call.component.html',
  styleUrls: ['./generate-call.component.css']
})
export class GenerateCallComponent {
  selectedCountryCode: any;
  customer: SendCallDTO = new SendCallDTO();
  customerNumber = "";
  countryCodes = [];
  samplePrompt = [];
  isLoading = false;
  prompt = ""
  sharedHeight: number = 141
  promptTypeEnumState = PromptTypeEnumState;
  selectedPrompt = new IndustryPromptDto();
  @ViewChild(PromptsComponent) createPromptComponent!: PromptsComponent; // Reference to the child component
  @ViewChild(VoicesComponent) voicesComponent!: VoicesComponent; // Reference to the child component

  childFormValid: boolean;
  callingProvider: CallProviderEnum;
  callProviderEnumState = CallProviderEnumState;

  constructor(private callService: CallServiceServiceProxy, public commonService: CommonService, private appSession: AppSessionService,
  ) {
    this.customer.industry = this.appSession.user.industry
    this.callingProvider = appSession.tenant.callProvider
  }
  ngOnInit() {
    this.getCountries();

  }

  getCountries() {
    this.countryCodes = this.commonService.countries;
    let selectedCountry = this.commonService.countries.find(x => x.countryName == this.appSession.user.country);
    if (selectedCountry?.phoneCode) {
      this.selectedCountryCode = selectedCountry.phoneCode;
    }
  }
  onSubmit() {
    if (this.customerNumber && this.customer.customerName) {
      this.isLoading = true;
      this.customer.customerNumber = this.selectedCountryCode + this.customerNumber;
      this.customer.industry = this.appSession.tenant.industry;
      this.customer.prompt = this.createPromptComponent.selectedPrompt.prompt;
      this.customer.voiceId = this.voicesComponent.id;
      this.customer.promptFirstMessage = this.createPromptComponent.selectedPrompt.firstMessage

      this.callService.call(this.customer).subscribe(
        res => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Call Enqueued',
          });
          this.customer.customerNumber = this.customer.customerNumber.replace(this.selectedCountryCode, "");
          this.isLoading = false;
        },
        err => {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Error',
          //   text: 'An error occurred while enqueuing the call.',
          // });
          this.customer.customerNumber = this.customer.customerNumber.replace(this.selectedCountryCode, "");
          this.isLoading = false;
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'An error occurred while enqueuing the call.',
      });
      this.customer.customerNumber = this.customer.customerNumber.replace(this.selectedCountryCode, "");
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

  onPromptCreated(newPrompt: IndustryPromptDto) {
    this.selectedPrompt = newPrompt;
  }

  onChildFormStatusChange(isValid: boolean) {
    this.childFormValid = isValid;
  }
  validateNumberInput(event: KeyboardEvent) {
    const char = event.key;
    if (!/^\d$/.test(char)) {
      event.preventDefault();
    }
  }
}
