import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccountRoutingModule } from './account-routing.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountLanguagesComponent } from './layout/account-languages.component';
import { AccountHeaderComponent } from './layout/account-header.component';
import { AccountFooterComponent } from './layout/account-footer.component';

// tenants
import { TenantChangeComponent } from './tenant/tenant-change.component';
import { TenantChangeDialogComponent } from './tenant/tenant-change-dialog.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordForgetComponent } from './reset-password-forget/reset-password-forget.component';


import { NgSelectModule } from '@ng-select/ng-select';
import { ThemeBtnComponent } from '@app/theme-btn/theme-btn.component';
import { VoiceDemoComponent } from './voice-demo/voice-demo.component';
import { DemoCallComponent } from './demo-call/demo-call.component';
import { CalendarComponent } from './calendar/calendar.component';



// import moment from 'moment';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        ServiceProxyModule,
        AccountRoutingModule,
        ModalModule.forChild(),
        NgSelectModule,

        
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent,
        AccountLanguagesComponent,
        AccountHeaderComponent,
        AccountFooterComponent,
        // tenant
        TenantChangeComponent,
        TenantChangeDialogComponent,
        LandingPageComponent,
        ForgetPasswordComponent,
        ResetPasswordForgetComponent,
        ThemeBtnComponent,
        VoiceDemoComponent,
        DemoCallComponent,
        CalendarComponent,
        
    ],
    exports:[ThemeBtnComponent]
})
export class AccountModule {

}
