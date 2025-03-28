import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@node_modules/@angular/router";
import { NotifyService } from "@node_modules/abp-ng2-module";
import { BillinInfo, PaymentServiceServiceProxy } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-header-balance",
  templateUrl: "./header-balance.component.html",
  styleUrls: ["./header-balance.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBalanceComponent implements OnInit {
  plan = new BillinInfo();
  constructor(private PaymentServiceService: PaymentServiceServiceProxy, private cdr: ChangeDetectorRef
    , private notify: NotifyService, private router: Router,
  ) { this.getCurrentBalance(); }

  ngOnInit(): void {
    this.getCurrentBalance();
  }
  getCurrentBalance() {
    this.PaymentServiceService.getTenantBillingInformation().subscribe(
      (result) => {
        this.plan = result;

        if (this.plan.redirectToSubscriptionPage) {
          // Redirect to subscription page
          this.notify.error(
            'Your plan is no longer active. Please subscribe to continue.',
            'Subscription Required'
          );
          this.router.navigate(['/app/plans']);
        } else if (this.plan.showDuePaymentOption) {
          // Show due payment notification
          this.notify.warn(
            'You have a pending payment due. Please clear it to continue using our services.',
            'Payment Due'
          );
        } else if (this.plan.isTrialUser) {
          // Show trial user notification
          this.notify.info(
            'You are currently on a trial plan. Upgrade to a subscription to unlock more features!',
            'Trial Plan'
          );
        }
       
          

        this.cdr.detectChanges();
      },
      (error) => {
        this.notify.error(
          'Failed to fetch billing information. Please try again later.',
          'Error'
        );
        console.error('Error fetching billing information:', error);
      }
    );
  }

  planCheckout() {
    this.router.navigate(['/app/setting-tabs'])
  }
}

