import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@node_modules/@angular/router';

import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { ForgetPasswordServiceServiceProxy, PasswordRestDto } from '@shared/service-proxies/service-proxies';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password-forget',
  templateUrl: './reset-password-forget.component.html',
  styleUrls: ['./reset-password-forget.component.css']
})
export class ResetPasswordForgetComponent {
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;
  changePasswordDto = new PasswordRestDto();
  email: any = [];
  saving = false;
  hidePassword = true;
  sellerLogo: any;
  showHidePassword() {
    this.hidePassword = !this.hidePassword;
  }
  
constructor(public _forgetPassword : ForgetPasswordServiceServiceProxy,private router: Router, private activatedRoute: ActivatedRoute)
{

}
ngOnInit()
{
  this.getUserIdFromRoutes();
}
newPasswordValidationErrors: Partial<AbpValidationError>[] = [
  {
    name: 'pattern',
    localizationKey:
      'PasswordsMustBeAtLeast8CharactersContainLowercaseUppercaseNumber',
  },
];
confirmNewPasswordValidationErrors: Partial<AbpValidationError>[] = [
  {
    name: 'validateEqual',
    localizationKey: 'PasswordsDoNotMatch',
  },
];

getUserIdFromRoutes() {
  this.activatedRoute.paramMap.subscribe((res: any) => {
    this.changePasswordDto.email = res.params.email;
    this.email.push(this.changePasswordDto.email);
    this.router.navigate(['/account/reset-password/' + " "]);
  }
  )

}
toggleVisibility(field: string): void {
  if (field === 'newPassword') {
    this.hideNewPassword = !this.hideNewPassword;
  } else if (field === 'confirmNewPassword') {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
  changePassword() {
    this.changePasswordDto.email = this.email[0].toString();
    this._forgetPassword.resetPassword(this.changePasswordDto)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((success) => {
        if (success) {
          Swal.fire({
            title: 'Success',
            text: "Your password has been updated successfully",
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#1b286e'


          })
          // abp.message.success('Password changed successfully', 'Success');
          this.saving = true;
          this.router.navigate(['/']);
        }
        this.saving = false;
      }, err => {
        Swal.fire({
          title: 'Error',
          text: 'Password failed',
          icon: 'warning',
        })
        this.saving = false;
      });
  }
}
