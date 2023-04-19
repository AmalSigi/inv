import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  public url: string = 'https://api-sales-app.josetovar.dev';

  // ********************** Login Function**************************
  public login(loginValue: any): Observable<any> {
    return this.http.post(`${this.url}/login`, loginValue);
  }
  // ********************** Register Function**************************

  public register(registerVale: any): Observable<any> {
    return this.http.post(`${this.url}/users`, registerVale);
  }

  // ********************** Auth Function**************************

  public getAuth(): Observable<any> {
    return this.http.post(`${this.url}/auth`, {});
  }

  // ********************** Product Function**************************

  public setApi(productId: number): Observable<any> {
    return this.http.get(`${this.url}/products/${productId}`);
  }
  public getProduct(): Observable<any> {
    return this.http.get(`${this.url}/products`);
  }

  public putProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.url}/products`, product);
  }

  public delectProduct(product: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/products/${product}`);
  }
  // ********************** Client Function**************************

  public getClients(): Observable<any> {
    return this.http.get(`${this.url}/clients`);
  }

  public putClients(clients: any): Observable<any> {
    return this.http.put<any>(`${this.url}/clients`, clients);
  }

  public postClients(client: any): Observable<any> {
    return this.http.post<any>(`${this.url}/clients`, client);
  }

  public delectClient(client: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/clients/${client}`);
  }
  // ********************** Sale Function**************************
  public getSale(): Observable<any> {
    return this.http.get(`${this.url}/sales`);
  }

  public postSale(salesVale: any): Observable<any> {
    return this.http.post(`${this.url}/sales`, salesVale);
  }
  public getSaleByID(saleId: number): Observable<any> {
    return this.http.get(`${this.url}/sales/${saleId}`);
  }
  // ********************** Quick Sale Function**************************

  public getQuickSale(): Observable<any> {
    return this.http.get(`${this.url}/quick-sales`);
  }
  public getQuickSaleById(id: number): Observable<any> {
    return this.http.get(`${this.url}/quick-sales/${id}`);
  }
  public postQuickSale(sale: any): Observable<any> {
    return this.http.post(`${this.url}/quick-sales`, sale.value);
  }

  public putQuickSale(sale: any): Observable<any> {
    return this.http.put(`${this.url}/quick-sales`, sale);
  }
}
