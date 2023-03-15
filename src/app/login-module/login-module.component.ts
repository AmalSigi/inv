import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.scss']
})
export class LoginModuleComponent {
  constructor(private readonly router :Router , private readonly http: HttpClient){}

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  public isAuthenticated: boolean = false;
  public get controls() {
    return this.loginForm.controls;
  }
  public login(){
    const url:string='https://api-sales-app.josetovar.dev/login'
 
   const body =this.loginForm.value;
   
   console.log(body)
   
   this.http.post(url,body).subscribe((response:any)=>{
   
     if(response){
   localStorage.setItem('access_token',JSON.stringify(response.access_token));

   this.router.navigate(['./dashboard'])
   
      
     }
   
      
       // if(user.email === this.loginForm.value.email && user.password === this.loginForm.value.password){
       //   localStorage.setItem('logged','true')
       //   this.router.navigate(['/dashboard'])
      
       // }
      
   
   })
   }
}
