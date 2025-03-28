import { Component } from '@angular/core';
import { NotifyService } from '@node_modules/abp-ng2-module';
import { AuthServiceProxy, CalendlyServiceProxy, ServiceProxy, ThirdpartyIntegrationKeyServiceProxy } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@node_modules/@angular/router';
import { AuthenticationPlateformEnumState, CallProviderEnumState } from '@shared/AppEnums';
import { AppSessionService } from '@shared/session/app-session.service';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent {
  isLoading: boolean = false;
  checkoutRoute: boolean = false
  integrations = [
    {
      name: 'Google Calendar',
      image: '../../assets/img/google.svg',
      description: 'Integrate Google Meet to schedule Meetings',
      action: () => this.connectToGoogle(),
      authenticationPlateform: AuthenticationPlateformEnumState.Google,
      connectedVal: null
    },
    {
      name: 'Outlook',
      image: '../../assets/img/outlook.png',
      description: 'Integrate Outlook to manage emails and schedules',
      action: () => this.connectToOutlook(),
      authenticationPlateform: AuthenticationPlateformEnumState.Outlook,
      connectedVal: null
    },
    {
      name: 'Calendly',
      image: '../../assets/img/inte-images/Callendy.png',
      description: 'Integrate Calendly to easily schedule appointments',
      action: () => this.connectToCalendly(),
      authenticationPlateform: AuthenticationPlateformEnumState.Calendly,
      connectedVal: null
    }
  ];
  isRetell = false;
  connectIntegrations = [];
  authenticationPlateformEnumState = AuthenticationPlateformEnumState;
  constructor(public goolgeService: ServiceProxy, private notifyService: NotifyService, 
    private readonly outlookService: ServiceProxy, private route: ActivatedRoute,
    private readonly calendlyservice : CalendlyServiceProxy,
    private thirdpartyKeyService: ThirdpartyIntegrationKeyServiceProxy,
    private appSession: AppSessionService
  ) {
    this.isRetell =  this.appSession.tenant.callProvider == CallProviderEnumState.Retell
  }
  connectToGoogle() {
    this.isLoading = true
    this.goolgeService.googleAuthication().subscribe(res => {
      window.open(res)
      this.isLoading = false
      
    }, error => {
      this.isLoading = false
      this.notifyService.error("Error Occur");
    })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.checkoutRoute = params['value'];      
    })
    this.getConnectedKey();
  }

  getConnectedKey(){
    this.isLoading = true;
    this.thirdpartyKeyService.thirdpartyIntegrationKey().subscribe(res=>{
      this.connectIntegrations = res;
      this.integrations.forEach(x=>{
        x.connectedVal = this.connectIntegrations.find(y=>y.authenticationPlateformEnum == x.authenticationPlateform);
      })
      this.isLoading = false;
    })
  }

  connectToOutlook() {
    this.outlookService.outlookAuthentication().subscribe(res => {
      window.open(res)
      this.isLoading = false
     
    }, error => {
      this.isLoading = false
      this.notifyService.error("Error Occur");
    })

  }
  connectToCalendly()
  {
    this.isLoading=true
    this.calendlyservice.calendlyAuthentication().subscribe(res=>{
      window.open(res)
       this.isLoading=false
    }, error=>{
      this.isLoading=false
    })
  }
 
}

