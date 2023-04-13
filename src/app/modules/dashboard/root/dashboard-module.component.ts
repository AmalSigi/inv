import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-module',
  templateUrl: './dashboard-module.component.html',
})
export class DashboardModuleComponent {
  constructor(private readonly route: Router) {
    // localStorage.setItem('logged', 'false');
  }
  logout() {
    localStorage.setItem('access_token', '');

    this.route.navigate(['/home']);
  }
}
