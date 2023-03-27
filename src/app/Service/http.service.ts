import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  public url: string = 'https://api-sales-app.josetovar.dev';

  // ********************** Product Function**************************

  public setApi(productId: number): Observable<any> {
    return this.http.get(`${this.url}/products/${productId}`);
  }
  public getData(): Observable<any> {
    return this.http.get(`${this.url}/products`);
  }

  public putData(product: any): Observable<any> {
    return this.http.put<any>(`${this.url}/products`, product);
  }

  public delectData(product: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/products/${product}`);
  }
  // ********************** Client Function**************************

  public getClients(): Observable<any> {
    return this.http.get(`${this.url}/clients`);
  }

  public putClients(clients: any): Observable<any> {
    return this.http.put<any>(`${this.url}/clients`, clients);
  }

  public postClients(client: any) {}

  public delectClient(client: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/clients/${client}`);
  }
  // ********************** Sale Function**************************
  public getSale(): Observable<any> {
    return this.http.get(`${this.url}/sales`);
  }

  public postSale(salesVale:any) {
    this.http.post(`${this.url}/sales`,salesVale)
  }
  public getSaleByID(saleId:number){
  
    this.http.get(`${this.url}/sales/${saleId}`).subscribe((res)=>{
      console.log(res)
    })
    return this.http.get(`${this.url}/sales/${saleId}`);

  }
}
