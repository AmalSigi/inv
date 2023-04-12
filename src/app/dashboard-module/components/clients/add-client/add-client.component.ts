import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Toastr } from '@service/toastr.service';
import { HttpService } from '@service/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from '@service/main-service.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
})
export class AddClientComponent {
  constructor(
    private readonly http: HttpClient,
    private route: ActivatedRoute,

    private router: Router,

    private readonly clientAcess: MainServiceService,
    private apiService: HttpService,
    private toastr: Toastr
  ) {}

  public addProductForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });
  public addProduct() {
    const url: string = 'https://api-sales-app.josetovar.dev/clients';

    this.http
      .post(url, this.addProductForm.value)
      .subscribe((response: any) => {
        if (response) {
          this.toastr.add();
          this.apiService.getData().subscribe((response: any) => {
            this.clientAcess.clickEventActivated();
            this.addProductForm.reset();
          });
        }
      });

    this.route.queryParams.subscribe((params: { [source: string]: string }) => {
      if (params['source'])
        this.router.navigate(['/dashboard/sales'], {
          queryParams: { source: 'client' },
        });
    });
  }
}