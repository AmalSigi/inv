import * as Papa from 'papaparse';
import { formatCurrency } from '@angular/common';
import { Toastr } from '@service/toastr.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, map, of } from 'rxjs';
import { ProductService } from '@productservice/product.service';
import { MainServiceService } from '@service/main-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadService } from 'src/app/core/Http/Load/load.service';
import { Iproduct, ImportProductResponse } from '@interface/product/iproduct';
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
    private readonly productService: ProductService,
    private readonly main: MainServiceService,
    private readonly fileUploadService: LoadService
  ) {}

  public products$!: Observable<any>;

  public fileToUpload!: File;

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
    this.products$ = this.productService.getProduct();
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

    this.productService
      .putProduct(updatedValues)
      .subscribe((response: Iproduct) => {
        this.toastr.update();
        this.productService.getProduct().subscribe((response) => {
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

  public onCheckboxChange(product: Iproduct, anyEvent: any): void {
    const status = anyEvent.target.checked;
    this.productService
      .putProductStatus(product.id, status)
      .subscribe((reponse) => {
        if (reponse) {
        }
      });
  }

  public delete(productId: number): void {
    this.productService
      .delectProduct(productId)
      .subscribe((responses: Iproduct) => {
        this.productService.getProduct().subscribe((responses) => {
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
    this.products$ = this.productService.getProduct().pipe(
      map((products: any) => {
        if (active.target.value) {
          return products.filter(
            (product: Iproduct) =>
              product.active.toString() === active.target.value
          );
        } else {
          return products;
        }
      })
    );
  }
  public setFiltersStock(active: any): void {
    this.products$ = this.productService.getProduct().pipe(
      map((products: any) => {
        if (active.target.value == 1) {
          return products.filter((product: Iproduct) => product.stock > 0);
        } else if (active.target.value == 2) {
          return products.filter((product: Iproduct) => product.stock == 0);
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
  public fileImport(event: any): void {
    this.fileToUpload = event.target.files[0];
    this.uploadFileToActivity(this.fileToUpload);
  }

  public uploadFileToActivity(file: File): void {
    this.fileUploadService.postProductFile(file).subscribe({
      next: () => {
        this.toastr.import();
        this.getProduct();
      },
      error: () => {},
      complete: () => {},
    });
  }

  public downloadFile(): void {
    this.productService.getProduct().subscribe((response: Iproduct[]) => {
      const file = Papa.unparse(response);
      const blob = new Blob([file], { type: 'csv' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'Product.csv';
      link.click();
      this.toastr.download();
    });
  }
}
