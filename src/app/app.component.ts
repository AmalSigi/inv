import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuOpen = false;

  dashboardView: boolean = false;
  title = 'Inventory';
  constructor(private readonly route: Router) {
    // localStorage.setItem('logged', 'false');
  }
  logout() {
    localStorage.setItem('access_token', '');
    console.log(localStorage.getItem('access_token'));
    this.dashboardView = true;
    this.route.navigate(['/home']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
