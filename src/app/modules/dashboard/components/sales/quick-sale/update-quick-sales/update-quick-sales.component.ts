import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@commonservice/http.service';
import { Iproduct } from '@interface/product/iproduct';
import { Isale } from '@interface/sale/sale';
import { SalesService } from '@saleservice/sales.service';
import { Toastr } from '@service/toastr.service';
import { Observable, map } from 'rxjs';
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
    private readonly httpService: HttpService,
    private readonly quickSaleService: SalesService,

    private readonly toastr: Toastr,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.product$ = this.httpService.getProduct();
    this.main();
  }

  public main(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.quickSaleId = +params['id'];
      this.httpService
        .getQuickSaleById(this.quickSaleId)
        .subscribe((respo: Isale[]) => {
          console.log(respo);
          this.quickSale = respo;
          this.quicSaleForm.get('id')?.setValue(this.quickSale.id);
          this.quicSaleForm.get('name')?.setValue(this.quickSale.name);
          for (let product of this.quickSale.products) {
            this.addProduct(product);
          }
        });
    });
  }

  public quicSaleForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
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

  public delect(productId: number): void {
    this.addedProduct = this.addedProduct.filter(
      (product: Iproduct) => product.id != productId
    );
    const index = this.products.controls.findIndex(
      (x) => x.value === productId
    );
    this.products.removeAt(index);
  }

  public save(): void {
    let updateedQuickSale = this.quicSaleForm.value;
    this.quickSaleService.putQuickSale(updateedQuickSale).subscribe({
      next: () => {
        this.toastr.update();
        this.route.navigate(['/dashboard/sales/quicksale']);
      },
      error: () => {
        this.toastr.error();
      },
      complete: () => {},
    });
  }
}
