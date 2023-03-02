import { Component } from '@angular/core';
import { Users } from "./fake-user";
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  [x: string]: any;

  public isAuthenticated: boolean = false;

 
localStorage: any;

constructor(private readonly router :Router , private readonly http: HttpClient){}


public loginForm = new FormGroup({
  email: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),
});


public get controls() {
  return this.loginForm.controls;
}
public login(){
 const url:string='https://63bfcce3e262345656f0627b.mockapi.io/actors'
this.http.get<any[]>(url).subscribe((response)=>{
  for(let user of response){
   
    if(user.email === this.loginForm.value.email && user.password === this.loginForm.value.password){
      localStorage.setItem('logged','true')
      this.router.navigate(['/dashboard'])
   
    }
   
}
})
}

}


