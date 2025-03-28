import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        ApiServiceProxies.BrokerPropertyServiceServiceProxy,
        ApiServiceProxies.CallServiceServiceProxy,
        ApiServiceProxies.LeadServiceServiceProxy,
        ApiServiceProxies.MeetingScheduleServiceServiceProxy,
        ApiServiceProxies.ExcelServiceProxy,
        ApiServiceProxies.BackgroundSchedulerServiceServiceProxy,
        ApiServiceProxies.NotesServiceProxy,
        ApiServiceProxies.CallConfigurationServiceProxy,
        ApiServiceProxies.PurchasedNumberServiceServiceProxy,
        ApiServiceProxies.CountryServiceServiceProxy,        
        ApiServiceProxies.FacebookIntegrationServiceServiceProxy,
        ApiServiceProxies.PaymentServiceServiceProxy,
        ApiServiceProxies.GatewayServiceServiceProxy,
        ApiServiceProxies.ForgetPasswordServiceServiceProxy,
        ApiServiceProxies.ServiceProxy,
        ApiServiceProxies.IndustryPromptServiceProxy,
        ApiServiceProxies.CalendlyServiceProxy,
        ApiServiceProxies.ThirdpartyIntegrationKeyServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
