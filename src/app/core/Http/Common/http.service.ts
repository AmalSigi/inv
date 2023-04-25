import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/enviroment';
import { Iclient } from '@interface/client/iclient';
import { Isale } from '@interface/sale/sale';
import { Iproduct } from '@interface/product/iproduct';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  // ********************** Login Function**************************
  public login(loginValue: any): Observable<any> {
    return this.http.post(`${environment.url}/login`, loginValue);
  }
  // ********************** Register Function**************************

  public register(registerVale: any): Observable<any> {
    return this.http.post(`${environment.url}/users`, registerVale);
  }

  // ********************** Auth Function**************************

  public getAuth(): Observable<any> {
    return this.http.post(`${environment.url}/auth`, {});
  }

  // ********************** Product Function**************************

  public setApi(productId: number): Observable<any> {
    return this.http.get(`${environment.url}/products/${productId}`);
  }
  public getProduct(): Observable<any> {
    return this.http.get(`${environment.url}/products`);
  }

  public putProduct(product: Iproduct): Observable<Iproduct> {
    return this.http.put<Iproduct>(`${environment.url}/products`, product);
  }

  public delectProduct(product: number): Observable<any> {
    return this.http.delete<any>(`${environment.url}/products/${product}`);
  }
  // ********************** Client Function**************************

  public getClients(): Observable<any> {
    return this.http.get(`${environment.url}/clients`);
  }

  public putClients(clients: Iclient): Observable<Iclient> {
    return this.http.put<Iclient>(`${environment.url}/clients`, clients);
  }

  public postClients(client: Iclient): Observable<Iclient> {
    return this.http.post<Iclient>(`${environment.url}/clients`, client);
  }

  public delectClient(client: number): Observable<any> {
    return this.http.delete<any>(`${environment.url}/clients/${client}`);
  }
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
  public postQuickSale(sale: any): Observable<any> {
    return this.http.post(`${environment.url}/quick-sales`, sale.value);
  }

  public putQuickSale(sale: Isale): Observable<any> {
    return this.http.put(`${environment.url}/quick-sales`, sale);
  }
}
