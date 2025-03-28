import { Component, Injector } from "@angular/core";
import { FacebookService } from "../../shared/services/facebook.service"; // Update the path as necessary
import {
  FacebookIntegrationServiceServiceProxy,
  FbTokenDto,
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "app-facebook-integration",
  templateUrl: "./facebook-integration.component.html",
  styleUrls: ["./facebook-integration.component.css"],
})
export class FacebookIntegrationComponent extends AppComponentBase {
  pages: any[] = [];
  userAccessToken: string = "";

  constructor(
    private facebookService: FacebookService,
    private fbService: FacebookIntegrationServiceServiceProxy,
    injector: Injector
  ) {
    super(injector);
  }

  login() {
    this.facebookService.login().then((response) => {
      this.userAccessToken = response.accessToken;
      this.loadPages();
    });
  }
  loadPages() {
    this.facebookService
      .getPages(this.userAccessToken)
      .then((pages) => {
        this.pages = pages;

        const fbTokens = this.pages.map((page) => ({
          pageId: page.id,
          token: page.access_token,
        }));

        this.subscribePage(fbTokens);
      })
      .catch(() => {
        this.notify.error("Failed to load Facebook pages!");
      });
  }

  subscribePage(fbTokens) {
    this.fbService.subscribePage(fbTokens).subscribe({
      next: () => this.notify.success("Meta accounts linked successfully!"),
      error: () => this.notify.error("Failed to link Meta accounts!"),
    });
  }
}
