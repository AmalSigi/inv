import { Iproduct } from '@interface/iproduct';
import { formatCurrency } from '@angular/common';
import { Toastr } from '@service/toastr.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, map, of } from 'rxjs';
import { ProductService } from '@productservice/product.service';
import { MainServiceService } from '@service/main-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 5;
  pageLength!: number;
  constructor(
    private readonly toastr: Toastr,
    private readonly serviceApi: ProductService,
    private readonly main: MainServiceService
  ) {}

  public products$!: Observable<any>;

  public updateProductForm: FormGroup = new FormGroup({});
  public checkBool: boolean = false;

  public mainServiceSubscription: Subscription = this.main
    .getClickEvent()
    .subscribe(() => {
      this.getProduct();
    });

  ngOnInit(): void {
    this.getProduct();
  }

  public getProduct(): void {
    this.products$ = this.serviceApi.getProduct();
    this.products$.subscribe((products) => {
      products.map((product: any) => {
        this.updateProductForm.addControl(
          `${product.id}`,
          new FormGroup({
            price: new FormControl(formatCurrency(product.price, 'en-US', '$')),
            editbool: new FormControl(product.active),
            stock: new FormControl(product.stock, Validators.min(0)),
          })
        );
      });
    });
  }

  public setFormatCurrency(product: Iproduct, event: any): void {
    const price = formatCurrency(
      this.getValueFromCurrency(event.target.value),
      'en-US',
      '$'
    );

    this.updateProductForm.controls[product.id.toString()]
      .get('price')
      ?.setValue(price);
  }

  public getValueFromCurrency(value: string): number {
    let price: number;
    if (value.includes('$')) {
      price = Number(value.substring(1).replaceAll(',', ''));
    } else {
      price = Number(value.replaceAll(',', ''));
    }
    return price;
  }

  public setUpdatedValues(product: Iproduct): void {
    const price = +this.updateProductForm.controls[product.id].value.price
      .replaceAll('$', '')
      .replaceAll(',', '');
    const stock = this.updateProductForm.controls[product.id].value.stock;
    const value = { price, stock };
    const updatedValues = {
      ...product,
      ...value,
    };

    this.serviceApi
      .putProduct(updatedValues)
      .subscribe((response: Iproduct) => {
        this.toastr.update();
        this.serviceApi.getProduct().subscribe((response) => {
          this.products$ = of(response);
        });
      });
  }

  public setDisableValueForUpdate(product: Iproduct): boolean {
    const { price, stock } = this.updateProductForm.controls[product.id].value;
    const { editbool } = this.updateProductForm.controls[product.id].value;

    if (editbool) {
      if (
        !(
          +price.replaceAll('$', '').replaceAll(',', '') == product.price &&
          stock == product.stock
        )
      )
        return false;
    }
    return true;
  }

  onCheckboxChange(product: Iproduct, anyEvent: any): void {
    const status = anyEvent.target.checked;
    this.serviceApi
      .putProductStatus(product.id, status)
      .subscribe((reponse) => {
        if (reponse) {
        }
      });
  }

  public delete(productId: number): void {
    this.serviceApi
      .delectProduct(productId)
      .subscribe((responses: Iproduct) => {
        this.serviceApi.getProduct().subscribe((responses) => {
          this.products$ = of(responses);
        });
        this.toastr.delete();
      });
  }

  public setDisableValueForDelect(product: Iproduct): boolean {
    if (product.active) return true;
    return false;
  }

  public setFiltersStatus(active: any): void {
    this.products$ = this.serviceApi.getProduct().pipe(
      map((products: any) => {
        if (active.target.value) {
          return products.filter(
            (product: any) => product.active.toString() === active.target.value
          );
        } else {
          return products;
        }
      })
    );
  }
  public setFiltersStock(active: any): void {
    this.products$ = this.serviceApi.getProduct().pipe(
      map((products: any) => {
        if (active.target.value == 1) {
          return products.filter((product: any) => product.stock > 0);
        } else if (active.target.value == 2) {
          return products.filter((product: any) => product.stock == 0);
        } else {
          return products;
        }
      })
    );
  }

  public onPagination(event: { currentPage: number; pageSize: number }): void {
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
  }
  public fileImport(files: Event) {
    let fileToUpload = (files.target as HTMLInputElement).files?.item(0);
  }

  // uploadFileToActivity() {
  //   this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
  //     // do something, if upload success
  //     }, error => {
  //       console.log(error);
  //     });
  // }
}
