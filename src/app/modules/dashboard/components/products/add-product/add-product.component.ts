import { Component } from '@angular/core';
import { Toastr } from '@service/toastr.service';
import { ProductService } from '@productservice/product.service';
import { MainServiceService } from '@service/main-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iproduct } from '@interface/product/iproduct';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
  constructor(
    private productAcess: MainServiceService,
    private productService: ProductService,
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
    this.productService
      .postProduct(this.addProductForm.value)
      .subscribe((response: Iproduct) => {
        if (response) {
          this.toastr.add();
          this.productService.getProduct().subscribe((response: Iproduct) => {
            this.productAcess.clickEventActivated();
            this.addProductForm.reset();
            this.addProductForm.patchValue({ active: true });
          });
        }
      });
  }
}
