import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { BrokerPropertyComponent } from './broker-property/broker-property.component';
import { GenerateCallComponent } from './generate-call/generate-call.component';
import { InboundComponent } from './inbound/inbound.component';
import { LeadsComponent } from './leads/leads.component';
import { MeetingScheduleComponent } from './meeting-schedule/meeting-schedule.component';
import { PropertyDetailsComponent } from './broker-property/property-details/property-details.component';
import { LeadDetailsComponent } from './leads/lead-details/lead-details.component';
import { CallConfigurationComponent } from './call-configuration/call-configuration.component';
import { VoicesComponent } from './voices/voices.component';

import { PhoneNumberComponent } from './phone-number/phone-number.component';

import { PrivacyComponent } from 'account/privacy/privacy.component';
import { PlanselectionComponent } from './planselection/planselection.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
import { TopUpsComponent } from './top-ups/top-ups.component';
import { MeetingCalendarComponent } from './meeting-calendar/meeting-calendar.component';
import { CallDetailsComponent } from './inbound/call-details/call-details.component';
import { CallMenuComponent } from './call-menu/call-menu.component';

import { UpdateUserPasswordComponent } from 'account/update-user-password/update-user-password.component';

import { BillingTransactionComponent } from './billing-transaction/billing-transaction.component';
import { IntegrationComponent } from './integration/integration.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { SettingTabsComponent } from './setting-tabs/setting-tabs.component';
import { TestCalenderComponent } from './test-calender/test-calender.component';




@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent, canActivate: [AppRouteGuard] },
                    // { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    // { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    // { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    // { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                    { path: 'property', component: BrokerPropertyComponent, canActivate: [AppRouteGuard] },
                    { path: 'generate-call', component: GenerateCallComponent, canActivate: [AppRouteGuard] },
                    { path: 'inbound-call', component: InboundComponent, canActivate: [AppRouteGuard] },
                    { path: 'leads', component: LeadsComponent, canActivate: [AppRouteGuard] },
                    { path: 'meeting-schedule', component: MeetingScheduleComponent, canActivate: [AppRouteGuard] },
                    { path: 'property-details/:id', component: PropertyDetailsComponent, canActivate: [AppRouteGuard] },
                    { path: 'lead-details', component: LeadDetailsComponent, canActivate: [AppRouteGuard] },
                    { path: 'call-config', component: CallConfigurationComponent, canActivate: [AppRouteGuard] },
                    { path: 'voices', component: VoicesComponent, canActivate: [AppRouteGuard] },
                    { path: 'purchase-phonenumber', component: PhoneNumberComponent, canActivate: [AppRouteGuard] },
                    { path: 'user-profile', component: UserProfileComponent, canActivate: [AppRouteGuard] },
                    { path: 'plans', component: PlanselectionComponent, canActivate: [AppRouteGuard] },
                    { path: 'top-ups', component: TopUpsComponent, canActivate: [AppRouteGuard] },
                    { path: 'transactions', component: BillingTransactionComponent, canActivate: [AppRouteGuard] },
                    { path: 'payment-success', component: PaymentSuccessComponent, canActivate: [AppRouteGuard] },
                    { path: 'payment-failed', component: PaymentFailedComponent, canActivate: [AppRouteGuard] },
                    { path: 'meeting-calender', component: MeetingCalendarComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-user-password', component: UpdateUserPasswordComponent, canActivate: [AppRouteGuard] },
                    { path: 'call-details', component: CallDetailsComponent, canActivate: [AppRouteGuard] },
                    { path: 'call-menu', component: CallMenuComponent, canActivate: [AppRouteGuard] },
                    { path: 'integration', component: IntegrationComponent, canActivate: [AppRouteGuard] },
                    { path: 'setting-tabs', component: SettingTabsComponent, canActivate: [AppRouteGuard] },
                    { path: 'test-calendar', component: TestCalenderComponent, canActivate: [AppRouteGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
