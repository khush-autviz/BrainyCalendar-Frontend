import { Component, OnInit } from "@angular/core";
import { Router } from "@node_modules/@angular/router";
import { GatewayServiceServiceProxy, PaymentServiceServiceProxy } from "@shared/service-proxies/service-proxies";
import { AppSessionService } from "@shared/session/app-session.service";
import { error } from "console";

@Component({
  selector: "app-top-ups",
  templateUrl: "./top-ups.component.html",
  styleUrls: ["./top-ups.component.css"],
})
export class TopUpsComponent implements OnInit {
  topups: any[] = [];
  activePlanId = -1;
  isLoading :boolean=false
  constructor(
    private router: Router,
    private PaymentServiceService: PaymentServiceServiceProxy,
    private GatewayService:GatewayServiceServiceProxy,
    public session: AppSessionService
  ) {}

  ngOnInit(): void {
    this.getTopups();
  }
  getTopups(){
    this.isLoading=true
    this.PaymentServiceService.getAllTopUps().subscribe((result) => {     
      this.topups = result;
      this.isLoading=false
    },
    (error)=>{
      this.isLoading=false
    })
  }
  selectTopup(topUp){
    this.isLoading=true
    this.GatewayService.createTopUpSession(topUp.id).subscribe((result) => {
      window.location.href = result.url;
      this.isLoading=false
    },
    (error)=>{
      this.isLoading=false
    })
  }
}
