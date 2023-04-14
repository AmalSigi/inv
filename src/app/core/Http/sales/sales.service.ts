import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Toastr } from '../../Authentication/Services/toastr.service';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(
    private readonly http: HttpClient,
    private readonly toastr: Toastr
  ) {}
  public url: string = 'https://api-sales-app.josetovar.dev';

  // ********************** Sale Function**************************
  public getSale(): Observable<any> {
    return this.http.get(`${this.url}/sales`);
  }

  public postSale(salesVale: any) {
    return this.http.post(`${this.url}/sales`, salesVale);
  }
  public getSaleByID(saleId: number) {
    return this.http.get(`${this.url}/sales/${saleId}`);
  }
  // ********************** Quick Sale Function**************************

  public getQuickSale(): Observable<any> {
    return this.http.get(`${this.url}/quick-sales`);
  }
  public getQuickSaleById(id: number): Observable<any> {
    return this.http.get(`${this.url}/quick-sales/${id}`);
  }
  public postQuickSale(sale: any) {
    console.log(sale.value88);
    this.http.post(`${this.url}/quick-sales`, sale.value).subscribe({
      next: () => {
        this.toastr.add();
      },
      error: () => {},
      complete: () => {},
    });
  }
}
