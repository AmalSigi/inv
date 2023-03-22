import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dashboardView:boolean=false
  title = 'Inventory';
constructor(private readonly route:Router){}

  logout(){
    localStorage.setItem('logged','false')
    localStorage.setItem('access_token','')
    this.dashboardView=true
this.route.navigate(['/home'])
  }
}
