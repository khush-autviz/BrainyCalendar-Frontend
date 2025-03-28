import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@node_modules/@angular/router';
import { CallProviderEnumState, CallTabsEnum } from '@shared/AppEnums';
import { CallProviderEnum } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';



@Component({
  selector: 'app-call-menu',
  templateUrl: './call-menu.component.html',
  styleUrls: ['./call-menu.component.css']
})
export class CallMenuComponent {
  CallTabs = CallTabsEnum;
  CallConfig: any
  selectedTab: CallTabsEnum = CallTabsEnum.CallConfig;
  numberSelected: any;
  purchasephonenumber: any;
  voiceselected: any;
  isLoading: boolean = false
  callingProvider: CallProviderEnum;
  callProviderEnumState = CallProviderEnumState;

  constructor(private router: Router, private route: ActivatedRoute, private appService: AppSessionService) {
    this.callingProvider = this.appService.tenant.callProvider;
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      const tab = params['tab'];
      this.selectedTab = tab ? parseInt(tab, 10) : CallTabsEnum.CallConfig;
    });
  }

  setTab(tab: CallTabsEnum): void {
    this.selectedTab = tab;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },

    });
  }


}
