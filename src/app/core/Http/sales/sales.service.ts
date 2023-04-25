import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Toastr } from '@service/toastr.service';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { Isale } from '@interface/sale/sale';
@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(
    private readonly http: HttpClient,
    private readonly toastr: Toastr
  ) {}

  // ********************** Sale Function**************************
  public getSale(): Observable<any> {
    return this.http.get(`${environment.url}/sales`);
  }

  public postSale(salesVale: Isale): Observable<any> {
    return this.http.post(`${environment.url}/sales`, salesVale);
  }
  public getSaleByID(saleId: number): Observable<any> {
    return this.http.get(`${environment.url}/sales/${saleId}`);
  }
  // ********************** Quick Sale Function**************************

  public getQuickSale(): Observable<any> {
    return this.http.get(`${environment.url}/quick-sales`);
  }
  public getQuickSaleById(id: number): Observable<any> {
    return this.http.get(`${environment.url}/quick-sales/${id}`);
  }
  public postQuickSale(sale: any) {
    console.log(sale.value88);
    return this.http
      .post(`${environment.url}/quick-sales`, sale.value)
      .subscribe({
        next: () => {
          this.toastr.add();
        },
        error: () => {},
        complete: () => {},
      });
  }

  public deleteQuickSale(id: number): Observable<any> {
    return this.http.delete(`${environment.url}/quick-sales/${id}`);
  }

  public putQuickSale(sale: Isale): Observable<any> {
    return this.http.put(`${environment.url}/quick-sales`, sale);
  }
}
