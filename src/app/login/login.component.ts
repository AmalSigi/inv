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
  constructor(private readonly router :Router , private readonly http: HttpClient){}


  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public isAuthenticated: boolean = false;

  // ngOnInit(): void {
  //   localStorage.setItem('access_token', 'test');
  // }

 
public get controls() {
  return this.loginForm.controls;
}
public login(){
 const url:string='https://api-sales-app.josetovar.dev/login'

const body =this.loginForm.value;


this.http.post(url,body).subscribe((response:any)=>{
console.log(response)

  if(response){
    console.log('hi')
this.router.navigate(['dashboard'])

localStorage.setItem('access_token',JSON.stringify(response.access_token));
   
  }

   
    // if(user.email === this.loginForm.value.email && user.password === this.loginForm.value.password){
    //   localStorage.setItem('logged','true')
    //   this.router.navigate(['/dashboard'])
   
    // }
   

})
}

}


