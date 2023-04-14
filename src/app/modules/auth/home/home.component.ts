import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpService } from '@commonservice/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private readonly router: Router,
    private readonly http: HttpService
  ) {}

  public registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
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
