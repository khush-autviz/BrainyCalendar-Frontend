import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@node_modules/@angular/forms';
import { Router } from '@node_modules/@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { ForgetPasswordServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent extends AppComponentBase implements OnInit {
  @ViewChild('ForgetPasswordForm', { static: false }) ForgetPasswordForm!: NgForm;
  saving = false;
  userNameOrEmailAddress : any;
  resetDto : any;
  _isDisabled: boolean;
  form: any;
  isEmailFieldDisabled: boolean = false;
  isOTPFieldHidden: boolean = false;
  userOtp: any;
  emailValid: boolean = false;
  constructor(public _forgetPassword : ForgetPasswordServiceServiceProxy,
    private router: Router,injector: Injector
  )
  {
    super(injector);
  }
  ngOnInit()
  {

  }
  
  set isDisabled(value: boolean) {
    this._isDisabled = value;
    if (value) {
      this.form.controls['userNameOrEmailAddress'].disable();
    } else {
      this.form.controls['userOtpForm'].enable();
    }

  }
  
  SendOTP() {
    this.saving = true;
    
    this._forgetPassword.createForgetPasswordCode(this.userNameOrEmailAddress).subscribe(result => {
      this.resetDto = result;
      this.isEmailFieldDisabled = true;
      this.saving = false;
      this.isOTPFieldHidden = true;
      Swal.fire({
        title: 'Success',
        text: "Check Your Email For OTP",
        icon: 'success',
        confirmButtonColor: '#1b286e',
        confirmButtonText: 'Ok'
      })
    }, err => {
      if (!this.emailValid) {
        Swal.fire({
          title: 'Error',
          text: 'Please Enter a Valid Email Id',
          icon: 'warning',
        });
        return;
      }
      this.saving = false
      this.isEmailFieldDisabled = false;
      this.isOTPFieldHidden = false;
    });


  }
  ResendOTP() {
    this.saving = true
    this._forgetPassword.resendOTP(this.userNameOrEmailAddress).subscribe(result => {
      this.resetDto = result;
      this.saving = false;
      Swal.fire({
        title: 'Success',
        text: "Check Your Email For OTP",
        icon: 'success',
        confirmButtonColor: '#1b286e',
        confirmButtonText: 'Ok'
      })
    }, err => {

      Swal.fire({
        title: 'Error',
        text: 'Please Enter Correct Email Id ',
        icon: 'warning',
      })
      this.saving = false
      
    });

  }
  onSubmitOTP() {
    this._forgetPassword.confirmOTP(this.userNameOrEmailAddress, this.userOtp).subscribe((success) => {
      if (success) {
        Swal.fire({
          title: 'correct OTP',
          text: 'OTP is correct',
          icon: 'info',
        })
      }
      else {

        Swal.fire({
          title: 'Error',
          text: 'Incorrect OTP',
          icon: 'warning',
        })
        this.saving = false
      }
    });
  }
   send(): any {
    this.saving = true;
    this._forgetPassword.confirmOTP(this.userNameOrEmailAddress, this.userOtp).subscribe((success) => {
      if (success) {
        Swal.fire({
          title: 'Success',
          text: "OTP Verify Successfully",
          icon: 'success',
          confirmButtonColor: '#1b286e',
          confirmButtonText: 'Ok'
        })
        this.router.navigate(['/account/reset-password/' + this.userNameOrEmailAddress]);
      }
      else {
        Swal.fire({
          title: 'Error',
          text: 'Incorrect OTP',
          icon: 'warning',
        })
        this.saving = false
      }

    },
      err => {
        Swal.fire({
          title: 'Error',
          text: 'Incorrect OTP',
          icon: 'warning',
        })
        this.saving = false
      });

   }
  checkEmailValidation() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (this.userNameOrEmailAddress && !emailRegex.test(this.userNameOrEmailAddress)) {
      this.emailValid = false;
    } else if (!this.userNameOrEmailAddress) {
      this.emailValid = false;
    } else if (this.userNameOrEmailAddress && emailRegex.test(this.userNameOrEmailAddress)) {
      this.emailValid = true;
    }
  }
  hideOTPField() {
    this.isOTPFieldHidden = false;
  }
}
