import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  openMenu: boolean = true

  constructor(
    private _router: Router,
  ) { }


  menuBtn() {
    this.openMenu = !this.openMenu;
  }

  // loginPage() {
  //   this._router.navigate(['/account/login']);
  // }

  // registerPage() {
  //   this._router.navigate(['/register']);
  // }
}
