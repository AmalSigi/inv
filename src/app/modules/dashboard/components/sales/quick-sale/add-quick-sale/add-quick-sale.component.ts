import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@commonservice/http.service';
import { Iproduct } from '@interface/product/iproduct';
import { Toastr } from '@service/toastr.service';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-add-quick-sale',
  templateUrl: './add-quick-sale.component.html',
})
export class AddQuickSalewComponent implements OnInit {
  @Output() childEvent = new EventEmitter<boolean>();
  public product$!: Observable<any>;
  public productName: any = '';

  public addedProduct: any[] = [];
  constructor(
    private readonly httpService: HttpService,
    private readonly toastr: Toastr
  ) {}
  ngOnInit(): void {
    this.product$ = this.httpService.getProduct();
  }

  public quicSaleForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    products: new FormArray([], Validators.required),
  });
  get products(): FormArray {
    return this.quicSaleForm.controls['products'] as FormArray;
  }
  public addProduct(product: any): void {
    console.log(product);
    const isObjectInArray = this.products.value.some(
      (obj: any) => JSON.stringify(obj) === JSON.stringify(product.id)
    );

    if (!isObjectInArray) {
      this.addedProduct.push(product);
      this.products.push(new FormControl(product.id, Validators.required));
    }
  }
  public modelUnShow(): void {
    const value: boolean = false;
    this.childEvent.emit(value);
  }

  public getProductName(event: any): void {
    this.productName = event.target.value;
    this.product$ = this.product$.pipe(
      map((products: any) => {
        return products.filter(
          (product: Iproduct) =>
            product.name
              .toLowerCase()
              .includes(this.productName.toLowerCase()) &&
            product.active == true &&
            product.stock > 0
        );
      })
    );
  }
  public removeSale(formInedx: number): void {
    this.addedProduct = this.addedProduct.filter(
      (product: Iproduct) => product.id != formInedx
    );
    const index = this.products.controls.findIndex(
      (x) => x.value === formInedx
    );
    this.products.removeAt(index);
  }

  public save(): void {
    this.httpService.postQuickSale(this.quicSaleForm).subscribe({
      next: () => {
        this.toastr.add();
      },
      error: () => {},
      complete: () => {},
    });
  }
}
