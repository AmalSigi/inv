import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Inventory';
constructor(private readonly route:Router){}

  logout(){
    localStorage.setItem('logged','false')
this.route.navigate(['/home'])
  }
}
