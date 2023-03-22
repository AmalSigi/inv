import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../Service/http.service';
import { Toastr } from '../Service/toastr.service';
import { DashboardModuleComponent } from '../dashboard-module/dashboard-module.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  constructor(
    private readonly http: HttpClient,
    private dashAcess: DashboardModuleComponent,
    private apiService: HttpService,
    private toastr: Toastr
  ) {}

  public addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    sku: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    active: new FormControl(true, Validators.required),
  });
  public addProduct() {
    // this.apiService.putData(this.addProductForm.value)

    const url: string = 'https://api-sales-app.josetovar.dev/products';

    this.http
      .post(url, this.addProductForm.value)
      .subscribe((response: any) => {
        if (response) {
          this.toastr.add();
          this.apiService.getData().subscribe((response: any) => {
            this.dashAcess.ngOnInit();
            this.addProductForm.reset();
            this.addProductForm.patchValue({ active: true });
          });
        }
      });
  }
}
