import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/Service/http.service';

@Component({
  selector: 'app-add-quick-salew',
  templateUrl: './add-quick-salew.component.html',
  styleUrls: ['./add-quick-salew.component.scss'],
})
export class AddQuickSalewComponent implements OnInit {
  @Output() childEvent = new EventEmitter<boolean>();
  public product$!: Observable<any>;
  public productName: any = '';
  constructor(private readonly apiService: HttpService) {}
  ngOnInit(): void {
    this.product$ = this.apiService.getData();
  }

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
          name: new FormControl(product.name, Validators.required),
        })
      );

      console.log(this.products);
    }
  }
  public modelUnShow() {
    const value: boolean = false;
    this.childEvent.emit(value);
  }

  public getProductName() {
    this.product$ = this.product$.pipe(
      map((products: any) => {
        return products.filter(
          (product: any) =>
            product.name
              .toLowerCase()
              .includes(this.productName.toLowerCase()) &&
            product.active == true &&
            product.stock > 0
        );
      })
    );
    // this.product$.subscribe((res) => {
    //   console.log(res);
    // });
  }
}
