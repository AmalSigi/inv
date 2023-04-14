import { Component } from '@angular/core';
import { Toastr } from '@service/toastr.service';
import { ProductService } from '@productservice/product.service';
import { MainServiceService } from '@service/main-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
  constructor(
    private productAcess: MainServiceService,
    private apiService: ProductService,
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
    this.apiService
      .postProduct(this.addProductForm.value)
      .subscribe((response: any) => {
        if (response) {
          this.toastr.add();
          this.apiService.getProduct().subscribe((response: any) => {
            this.productAcess.clickEventActivated();
            this.addProductForm.reset();
            this.addProductForm.patchValue({ active: true });
          });
        }
      });
  }
}
