import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  public url: string = 'https://api-sales-app.josetovar.dev';

  // ********************** Product Function**************************
  public getProduct(): Observable<any> {
    return this.http.get(`${this.url}/products`);
  }

  public putProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.url}/products`, product);
  }

  public postProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, product);
  }

  public getSingleProduct(productId: number): Observable<any> {
    return this.http.get(`${this.url}/products/${productId}`);
  }

  public delectProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/products/${productId}`);
  }
  public putProductStatus(productId: number, status: any): Observable<any> {
    return this.http.put<any>(
      `${this.url}/products/status/${productId}?status=${status}`,
      {}
    );
  }
}
