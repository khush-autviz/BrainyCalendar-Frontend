import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { CommonService } from '@shared/commonservice/common-logic.service';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppSessionService } from '@shared/session/app-session.service';

@Component({
  selector: 'header-user-menu',
  templateUrl: './header-user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserMenuComponent implements OnInit {
  profilePicture: string | null = null; // Declare profilePicture
  notificationValue: boolean = false;

  constructor(
    private _authService: AppAuthService,
    private router: Router,
    private _accountService: AccountServiceProxy,
    private commonService:CommonService,
    public session: AppSessionService,
    public cdr: ChangeDetectorRef
  ) {
    this.subscribeToProfilePicture();
   }
  subscribeToProfilePicture(): void {
    this.commonService.profilePicture$.subscribe(res => {
      this.profilePicture = res; 
      this.cdr.detectChanges(); 
    });
  }

  showNotifications() {
    this.notificationValue = !this.notificationValue;
  }

  logout(): void {
    this._authService.logout();
  }

  updatePassword(email: string): void {
    this.router.navigate(['/app/update-user-password'], { queryParams: { email } });
  }
  userProfile(id: number): void {
    this.router.navigate(['/app/user-profile'], { queryParams: { id } });
  }

  getUserProfilePic(): void {
    this._accountService.getProfilePic(this.session.user.id).subscribe(
      (res) => {
        if (res) {
          this.profilePicture = res;
          this.cdr.detectChanges();
        }
      },
      (error) => {
        console.error('Error fetching profile picture:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getUserProfilePic();
  }
}
