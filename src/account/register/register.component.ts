import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
  AccountServiceProxy,
  CountryServiceServiceProxy,
  RegisterInput,
  RegisterOutput
} from '@shared/service-proxies/service-proxies';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { CommonService } from '@shared/commonservice/common-logic.service';
import { PromptTypeEnumState } from '@shared/AppEnums';

@Component({
  templateUrl: './register.component.html',
  animations: [accountModuleAnimation()],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AppComponentBase {
  model: RegisterInput = new RegisterInput();
  saving = false;
  countries = [];
  passwordVisible: boolean = false;
  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _router: Router,
    private authService: AppAuthService,
    public commonService: CommonService,
    private countryService: CountryServiceServiceProxy
  ) {
    super(injector);
  }
  ngOnInit() {
    this.model.country = null;
    this.model.industry = null;
    this.loadCountries();
  }
  loadCountries(): void {
    this.countryService.getAllCountries().subscribe(res=>{
      this.countries = res;
      this.countries.sort((a, b) => a.countryName.localeCompare(b.countryName));
    })    
  }

  save(): void {
    this.saving = true;
    this.model.userName = this.model.emailAddress;
    this.model.agencyName = this.model.fullAgencyName.replace(/\s+/g, '');
 
    this._accountService
      .register(this.model)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(
        (result: RegisterOutput) => {
          if (!result.canLogin) {
            this.notify.success(this.l('SuccessfullyRegistered'));
            this._router.navigate(['/login']);
            return;
          }
 
          // Authenticate
          this.saving = true;
          this.authService.authenticateModel.userNameOrEmailAddress = this.model.userName;
          this.authService.authenticateModel.password = this.model.password;
          this.authService.authenticate(() => {
            this.saving = false;
          });
        },
        (error) => {  
          this.saving = false;
        }
      );
  }
  
  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    }
  }
}
