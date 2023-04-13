import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Toastr } from '../../../../../core/Service/toastr.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../../../core/Service/http.service';
import { MainServiceService } from '../../../../../core/Service/main-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
  constructor(
    private readonly http: HttpClient,
    private productAcess: MainServiceService,
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
            this.productAcess.clickEventActivated();
            this.addProductForm.reset();
            this.addProductForm.patchValue({ active: true });
          });
        }
      });
  }
}
