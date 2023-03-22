import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/Service/http.service';
import { Toastr } from 'src/app/Service/toastr.service';
import { DashboardModuleComponent } from '../../dashboard-module.component';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent {
  constructor(
    private readonly http: HttpClient,
    private dashAcess: DashboardModuleComponent,
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
    // this.apiService.putData(this.addProductForm.value)

    const url: string = 'https://api-sales-app.josetovar.dev/clients';

    this.http
      .post(url, this.addProductForm.value)
      .subscribe((response: any) => {
        if (response) {
          this.toastr.add();
          this.apiService.getData().subscribe((response: any) => {
            this.dashAcess.ngOnInit();
            this.addProductForm.reset();
          });
        }
      });
  }
}
