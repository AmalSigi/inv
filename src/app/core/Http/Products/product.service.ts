import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { Iproduct } from '@interface/product/iproduct';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  // ********************** Product Function**************************
  public getProduct(): Observable<any> {
    return this.http.get<Iproduct>(`${environment.url}/products`);
  }

  public putProduct(product: Iproduct): Observable<Iproduct> {
    return this.http.put<Iproduct>(`${environment.url}/products`, product);
  }

  public postProduct(product: any): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${environment.url}/products`, product);
  }

  public getSingleProduct(productId: number): Observable<any> {
    return this.http.get(`${environment.url}/products/${productId}`);
  }

  public delectProduct(productId: number): Observable<any> {
    return this.http.delete(`${environment.url}/products/${productId}`);
  }
  public putProductStatus(productId: number, status: boolean): Observable<any> {
    return this.http.put<any>(
      `${environment.url}/products/status/${productId}`,
      {},
      {
        params: {
          status,
        },
      }
    );
  }
}
