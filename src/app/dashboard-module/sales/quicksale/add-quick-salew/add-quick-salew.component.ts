import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-quick-salew',
  templateUrl: './add-quick-salew.component.html',
  styleUrls: ['./add-quick-salew.component.scss'],
})
export class AddQuickSalewComponent {
  @Output() childEvent = new EventEmitter<boolean>();
  constructor() {}

  public quicSaleForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    products: new FormArray([]),
  });
  get products(): FormArray {
    return this.quicSaleForm.controls['products'] as FormArray;
  }
  public addProduct(product: any) {
    const isObjectInArray = this.products.value.some(
      (obj: any) => JSON.stringify(obj.id) === JSON.stringify(product.id)
    );
    console.log(isObjectInArray);
    if (!isObjectInArray) {
      this.products.push(
        new FormGroup({
          // name:new FormControl(product.name, Validators.required),
          id: new FormControl(product.id, Validators.required),
          price: new FormControl(product.price, Validators.required),
          quantity: new FormControl(1, [
            Validators.required,
            Validators.min(0),
            Validators.max(product.stock),
          ]),
        })
      );

      // for (let i = 0; i < this.products.value.length; i++) {
      //   this.total+=this.products.value[i].price
      //   console.log(this.total)
      //   }
      console.log(this.products);
    }
  }
  public modelUnShow() {
    const value: boolean = false;
    this.childEvent.emit(value);
  }
}
