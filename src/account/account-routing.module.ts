import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordForgetComponent } from './reset-password-forget/reset-password-forget.component';
import { VoiceDemoComponent } from './voice-demo/voice-demo.component';
import { DemoCallComponent } from './demo-call/demo-call.component';
import { CalendarComponent } from './calendar/calendar.component';



@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AccountComponent,
                children: [
                    { path: 'login', component: LoginComponent },
                    { path: 'register', component: RegisterComponent },
                    { path: 'real-estate', component: LandingPageComponent },
                    { path: 'forget-password', component: ForgetPasswordComponent },
                    { path: 'reset-password/:email', component: ResetPasswordForgetComponent },
                    { path: 'voice-demo', component: VoiceDemoComponent },
                    { path: 'demo-call', component: DemoCallComponent },
                    { path: 'calendar', component: CalendarComponent },

                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule { }
