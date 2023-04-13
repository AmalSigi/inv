import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, map, of } from 'rxjs';
import { Toastr } from '@service/toastr.service';
import { HttpService } from '@service/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from '@service/main-service.service';
import { Iproduct } from 'src/app/Shared/interface/iproduct';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 5;
  pageLength!: number;
  constructor(
    private readonly http: HttpClient,
    private readonly toastr: Toastr,
    private readonly serviceApi: HttpService,
    private readonly main: MainServiceService
  ) {}

  public url: string = 'https://api-sales-app.josetovar.dev/products';
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
    this.products$ = this.serviceApi.getData();
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

    this.serviceApi.putData(updatedValues).subscribe((response: Iproduct) => {
      this.toastr.update();
      this.http.get<any>(`${this.url}`).subscribe((response) => {
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
    this.http
      .put(
        `https://api-sales-app.josetovar.dev/products/status/${product.id}?status=${status}`,
        {}
      )
      .subscribe((reponse) => {
        if (reponse) {
        }
      });
  }

  public delete(productId: number): void {
    this.serviceApi.delectData(productId).subscribe((responses: Iproduct) => {
      this.http.get<any>(`${this.url}`).subscribe((responses) => {
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
    this.products$ = this.http.get<any>(this.url).pipe(
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
    this.products$ = this.http.get<any>(this.url).pipe(
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
}
