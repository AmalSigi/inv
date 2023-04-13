import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}
  public registerForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public get controls() {
    return this.registerForm.controls;
  }

  public signUp() {
    // const url:string='https://63bfcce3e262345656f0627b.mockapi.io/actors'
    const url: string = 'https://api-sales-app.josetovar.dev/users';

    this.http.post(url, this.registerForm.value).subscribe((response) => {
      if (response) {
        this.router.navigate(['login']);
      }
    });
  }
}
