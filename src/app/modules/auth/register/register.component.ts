import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpService } from '@commonservice/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(
    private readonly router: Router,
    private readonly http: HttpService
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
    this.http.register(this.registerForm.value).subscribe((response) => {
      if (response) {
        this.router.navigate(['login']);
      }
    });
  }
}
