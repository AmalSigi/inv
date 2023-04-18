import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Toastr } from '@service/toastr.service';
import { HttpService } from '@commonservice/http.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-quick-sales',
  templateUrl: './update-quick-sales.component.html',
})
export class UpdateQuickSalesComponent {
  public product$!: Observable<any>;
  public productName: any = '';
  public quickSaleId: any;
  public quickSale!: any;
  public addedProduct: any[] = [];
  constructor(
    private readonly apiService: HttpService,
    private readonly toastr: Toastr,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.product$ = this.apiService.getProduct();
    this.main();
  }

  public main(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.quickSaleId = +params['id'];

      this.apiService
        .getQuickSaleById(this.quickSaleId)
        .subscribe((respo: any[]) => {
          console.log(respo);
          this.quickSale = respo;
          this.quicSaleForm.get('name')?.setValue(this.quickSale.name);
          for (let product of this.quickSale.products) {
            this.addProduct(product);
          }
        });
    });
  }

  public quicSaleForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    products: new FormArray([], Validators.required),
  });
  get products(): FormArray {
    return this.quicSaleForm.controls['products'] as FormArray;
  }
  public addProduct(product: any): void {
    const isObjectInArray = this.products.value.some(
      (obj: any) => JSON.stringify(obj) === JSON.stringify(product.id)
    );

    if (!isObjectInArray) {
      this.addedProduct.push(product);

      this.products.push(new FormControl(product.id, Validators.required));
    }
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

  public delect(productId: number): void {
    this.addedProduct = this.addedProduct.filter(
      (product: any) => product.id != productId
    );
    const index = this.products.controls.findIndex(
      (x) => x.value === productId
    );
    this.products.removeAt(index);
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
