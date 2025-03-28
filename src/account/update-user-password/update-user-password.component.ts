import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';  // Ensure this is the correct import path
import { ForgetPasswordServiceServiceProxy, UpdatePasswordtDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-update-user-password',
  templateUrl: './update-user-password.component.html',
  styleUrls: ['./update-user-password.component.css']
})
export class UpdateUserPasswordComponent extends AppComponentBase implements OnInit {
  email: string;
  updatePassword: UpdatePasswordtDto = new UpdatePasswordtDto();
  confirmPassword: string = '';  // Add a field to hold the confirm password
  isPasswordSame: boolean = false;
  isLoading = false;
  // Flags for password visibility
  currentPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor(injector: Injector,
              private _resetPassword: ForgetPasswordServiceServiceProxy,
              private router: Router,
              private route: ActivatedRoute) {
    super(injector);  // Pass the injector to the parent class
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email']; // Get the email from the URL
    });
  }

  onSubmit(): void {
    this.isLoading=true;   
    if (this.updatePassword.newPassword === this.confirmPassword) {
      this.updatePassword.email = this.email;
      this._resetPassword.updatePassword(this.updatePassword).subscribe((res) => {
        if (res == true) {
          this.notify.success("Update password Successfully");
          this.isLoading = false;
          this.router.navigate(['/app/leads']);
        } else {
          this.notify.error("Please check current password");
          this.isLoading = false;
        }
      });
    }
  }

  // Method to toggle password visibility
  togglePasswordVisibility(field: string): void {
    if (field === 'current') {
      this.currentPasswordVisible = !this.currentPasswordVisible;
    } else if (field === 'new') {
      this.newPasswordVisible = !this.newPasswordVisible;
    } else if (field === 'confirm') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }
  onPaste(event: ClipboardEvent) {
    event.preventDefault();  // Stops pasting
    return false;
  }
}
