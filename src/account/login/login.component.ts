import { Component, Injector } from '@angular/core';
import { AbpSessionService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
  templateUrl: './login.component.html',
  animations: [accountModuleAnimation()],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends AppComponentBase {
  submitting = false;
  isforgetPassword = true;
  showPassword = false;

  constructor(
    injector: Injector,
    public authService: AppAuthService,
    private _sessionService: AbpSessionService
  ) {
    super(injector);

  }

  ngOnInit(): void {
    const themeValue = localStorage.getItem('themeMode');
    console.log(themeValue);
  }

  get multiTenancySideIsTeanant(): boolean {
    return this._sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }
    return true;
  }

  login(): void {
    this.submitting = true;
    this.authService.authenticate(() => (this.submitting = false));
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }
}
