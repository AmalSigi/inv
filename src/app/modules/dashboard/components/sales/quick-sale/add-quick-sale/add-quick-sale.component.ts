import { Observable, map } from 'rxjs';
import { Toastr } from '@service/toastr.service';
import { HttpService } from '@commonservice/http.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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
    private readonly apiService: HttpService,
    private readonly toastr: Toastr
  ) {}
  ngOnInit(): void {
    this.product$ = this.apiService.getProduct();
  }

  public quicSaleForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    products: new FormArray([]),
  });
  get products(): FormArray {
    return this.quicSaleForm.controls['products'] as FormArray;
  }
  public addProduct(product: any): void {
    console.log(this.addedProduct);
    const isObjectInArray = this.products.value.some(
      (obj: any) => JSON.stringify(obj) === JSON.stringify(product.id)
    );

    if (!isObjectInArray) {
      this.addedProduct.push(product);

      this.products.push(new FormControl(product.id, Validators.required));
      console.log(this.products);
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
          (product: any) =>
            product.name
              .toLowerCase()
              .includes(this.productName.toLowerCase()) &&
            product.active == true &&
            product.stock > 0
        );
      })
    );
  }

  public save(): void {
    this.apiService.postQuickSale(this.quicSaleForm).subscribe({
      next: () => {
        this.toastr.add();
      },
      error: () => {},
      complete: () => {},
    });
  }
}
