import { Component, Injectable, OnInit } from '@angular/core';
import { HttpService } from '../Service/http.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sample-products',
  templateUrl: './sample-products.component.html',
  styleUrls: ['./sample-products.component.scss'],
})
export class SampleProductsComponent implements OnInit {
  constructor(
    private readonly api: HttpService,
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  public product!: any;
  public url: string = 'https://63bfcce3e262345656f0627b.mockapi.io/product';

  public updatedStock: number | undefined;
  public updatedPrice: number | undefined;

  show: boolean = true;
  editshow: boolean = false;

  success() {
    this.toastr.success('Product updated successfully!', 'Success', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      closeButton: true,
    });
  }

  error() {
    this.toastr.error('Oops, something went wrong', 'Error');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const url: string =
        'https://63bfcce3e262345656f0627b.mockapi.io/products';

      this.api.setApi(params['productId']).subscribe((response: any) => {
        this.product = response;
      });
    });
  }

  edit() {
    this.show = false;

    this.editshow = true;
  }

  update(productId: number) {
    this.show = true;

    this.editshow = false;

    const price = this.updatedPrice;
    const stock = this.updatedStock;

    const updatedProduct = { price, stock };
    this.http
      .put<any>(`${this.url}/${productId}`, updatedProduct)
      .subscribe((response) => {
        // this.showSuccess()
        this.success();
        this.ngOnInit();
      });
  }
}
