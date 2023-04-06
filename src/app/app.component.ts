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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
