import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private readonly router :Router , private readonly http: HttpClient){}


  public registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public get controls() {
    return this.registerForm.controls;
  }


  public signUp(){
  const url:string='https://63bfcce3e262345656f0627b.mockapi.io/actors'

this.http.post(url,this.registerForm.value).subscribe((response=>{
  if(response){
    this.router.navigate(['login'])
  }
}))
   }


}
