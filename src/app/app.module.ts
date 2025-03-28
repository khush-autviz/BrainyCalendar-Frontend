import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { GenerateCallComponent } from './generate-call/generate-call.component';
import { InboundComponent } from './inbound/inbound.component';
import { RealestateModule } from 'realestate/realestate.module';
import { UploadLeadsComponent } from './leads/upload-leads/upload-leads.component';
import { LeadAnalysisComponent } from './leads/lead-analysis/lead-analysis.component';
import { LeadsComponent } from './leads/leads.component';
import { LeadDetailsComponent } from './leads/lead-details/lead-details.component';
import { CallConfigurationComponent } from './call-configuration/call-configuration.component';
import { VoicesComponent } from './voices/voices.component';

import { PhoneNumberComponent } from './phone-number/phone-number.component';

import { FacebookIntegrationComponent } from './facebook-integration/facebook-integration.component';

import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
import { HeaderBalanceComponent } from './header-balance/header-balance.component';
import { TopUpsComponent } from './top-ups/top-ups.component';

import { CallDetailsComponent } from './inbound/call-details/call-details.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrokerPropertyComponent } from './broker-property/broker-property.component';
import { AddBrokerPropertyComponent } from './broker-property/add-broker-property/add-broker-property.component';
import { MeetingScheduleComponent } from './meeting-schedule/meeting-schedule.component';
import { PropertyDetailsComponent } from './broker-property/property-details/property-details.component';


import { FullCalendarModule } from '@fullcalendar/angular';
import { TooltipModule } from 'primeng/tooltip';
import { PlanselectionComponent } from './planselection/planselection.component';

import { UpdateUserPasswordComponent } from 'account/update-user-password/update-user-password.component';
import { CallMenuComponent } from './call-menu/call-menu.component';

import { BillingTransactionComponent } from './billing-transaction/billing-transaction.component';
import { PrimeTableComponent } from '../../src/shared/prime-table/prime-table.component';
import { AddLeadComponent } from './leads/add-lead/add-lead.component';
import { IntegrationComponent } from './integration/integration.component';
// import { SchedulerModule } from "@progress/kendo-angular-scheduler";


import { UserProfileComponent } from './users/user-profile/user-profile.component';

import { ThemeBtnComponent } from './theme-btn/theme-btn.component';
import { AccountModule } from 'account/account.module';

import { MeetingCalendarComponent } from './meeting-calendar/meeting-calendar.component';
import { PromptsComponent } from './prompts/prompts.component';
import { SettingTabsComponent } from './setting-tabs/setting-tabs.component';
//import { SchedulerModule } from "@progress/kendo-angular-scheduler";
// import { DhtmlxCalendarModule } from 'dhtmlx-calendar';
import { TabViewModule } from 'primeng/tabview';
import { TestCalenderComponent } from './test-calender/test-calender.component';



@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,
        GenerateCallComponent,
        InboundComponent,
        UploadLeadsComponent,
        LeadAnalysisComponent,
        LeadsComponent,
        FacebookIntegrationComponent,
        LeadDetailsComponent,
        CallConfigurationComponent,
        PhoneNumberComponent,
        PlanselectionComponent,
        PaymentSuccessComponent,
        PaymentFailedComponent,
        HeaderBalanceComponent,
        TopUpsComponent,
        VoicesComponent,
        PhoneNumberComponent,
        CallDetailsComponent,
        BrokerPropertyComponent,
        AddBrokerPropertyComponent,
        MeetingScheduleComponent,
        PropertyDetailsComponent,
        MeetingCalendarComponent,
        CallDetailsComponent,
        CallMenuComponent,
        UpdateUserPasswordComponent,
        PrimeTableComponent,
        BillingTransactionComponent,
        AddLeadComponent,
        IntegrationComponent,
        UserProfileComponent,
        PromptsComponent,
        SettingTabsComponent,
        TestCalenderComponent

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
        ModalModule.forRoot(),
        RealestateModule,
        TableModule,
        DropdownModule,
        NgSelectModule,
        FullCalendarModule,
        TooltipModule,
        AccountModule,
        TabViewModule
    ],
    providers: []

})
export class AppModule { }
