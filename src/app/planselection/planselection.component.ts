import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@node_modules/@angular/router";
import {
  CreateSubscriptionSessionDto,
  GatewayServiceServiceProxy,
  PaymentServiceServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { AppSessionService } from "@shared/session/app-session.service";
import { error } from "console";

@Component({
  selector: "app-planselection",
  templateUrl: "./planselection.component.html",
  styleUrls: ["./planselection.component.css"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PlanselectionComponent implements OnInit {
  plans: any[] = [];
  activePlanId = -1;
  isLoading: boolean = false
  constructor(
    private router: Router,
    private PaymentServiceService: PaymentServiceServiceProxy, private gateway: GatewayServiceServiceProxy
  ) { }

  ngOnInit(): void {
    this.getPlans();
    this.getActivePlan();
  }

  getActivePlan() {
    this.isLoading = true;
    this.PaymentServiceService.getActivePlan().subscribe((result) => {
      this.activePlanId = result;
      this.isLoading = false;
    }),
      (error) => {
        this.isLoading = false
      }
  }
  getPlans() {
    this.isLoading = true;
    this.PaymentServiceService.listPlans().subscribe((result) => {
      this.plans = result;
      this.isLoading = false
    }),
      (error) => {
        this.isLoading = false
      }
  }
  selectPlan(plan: any) {
    var dto = new CreateSubscriptionSessionDto();
    dto.planId = plan.id;
    this.isLoading = true
    this.gateway.createSubscriptionSession(dto).subscribe(
      (result) => {
        window.location.href = result.url;
        this.isLoading = false;
      }
    ),
      (error) => {
        this.isLoading = false
      }
  }
}
