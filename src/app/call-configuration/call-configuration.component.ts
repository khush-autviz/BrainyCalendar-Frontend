import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NotifyService } from '@node_modules/abp-ng2-module';
import { CallProviderEnumState, TimeTypeEnumState } from '@shared/AppEnums';
import { CallConfigurationServiceProxy, CallTimeDto, CreateCallConfigDto, RetryCallTimeDto, TimeType } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';

@Component({
  selector: 'app-call-configuration',
  templateUrl: './call-configuration.component.html',
  styleUrls: ['./call-configuration.component.css']
})
export class CallConfigurationComponent {  
  isSaveDisabled: boolean = false;
  sendWhatsapp: boolean = false;
  sendFollowUpEmail: boolean = false;
  TimeTypeEnumState = TimeTypeEnumState;
  status: { apiConnection: string, callSystem: string, lastUpdated: string } = {
    apiConnection: 'Active',
    callSystem: 'Connected',
    lastUpdated: '2 minutes ago'
  };
  isLoading : boolean=false

  callConfigData: CreateCallConfigDto = new CreateCallConfigDto();
  isRetell = false;
  constructor(private readonly callConfigurationService: CallConfigurationServiceProxy, public notifyService: NotifyService, private appService: AppSessionService)
  {
    this.isRetell = appService.tenant.callProvider == CallProviderEnumState.Retell;
  }

  ngOnInit(){
    this.callConfigData.firstCallTiming =  CallTimeDto.fromJS({
      timeType: TimeTypeEnumState.Min, // Default to "min" or adjust as needed
      value: 1,               // Default value   
    });

    this.callConfigData.maximumCallAttempts = 1;
    this.generateRetryConfigs();
    
    this.getCallConfig();
  }
  getCallConfig() {
    this.callConfigurationService.callConfig().subscribe(res=>{
      if(res.retryTime?.length)
        this.callConfigData = res;
    })
  }

  onMaximumCallAttemptsChange() {
    this.isSaveDisabled = this.callConfigData.maximumCallAttempts > 5;
    if (this.isSaveDisabled) {
      this.notifyService.error('Maximum 5 call attempts are allowed.');
    }
    this.generateRetryConfigs();
  }

  generateRetryConfigs() {
    const maxAttempts = this.callConfigData.maximumCallAttempts || 0;

    // Generate retry configurations if within valid range
    if (maxAttempts <= 5) {
      this.callConfigData.retryTime = Array.from({ length: maxAttempts }, (_, index) =>
        RetryCallTimeDto.fromJS({
          timeType: TimeTypeEnumState.Min, // Default to "min" or adjust as needed
          value: 1,               // Default value
          retryNumber: index + 1  // Assign retry numbers sequentially
        })
      );
    }
  }

  saveChanges() {
    if (this.isSaveDisabled) {
      return; 
    }
    this.isLoading = true; 
  
    this.callConfigurationService.insertCallConfig(this.callConfigData).subscribe({
      next: (response) => {
        this.notifyService.success('Updated Successfully');
        
        // Update the local data with the latest saved data
        this.loadUpdatedData(); // Call function to refresh data locally
        
        this.isLoading = false;
      },
      error: (err) => {
        this.notifyService.error('Failed to save changes: ' + err.message);
        this.isLoading = false;
      },
    });
  }
  

  loadUpdatedData() {
    this.callConfigurationService.callConfig().subscribe({
      next: (data) => {
        this.callConfigData = data; // Update local data
      },
      error: (err) => {
        this.notifyService.error('Failed to load updated data: ' + err.message);
      }
    });
  }
}