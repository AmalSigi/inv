
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private readonly http:HttpClient) { }

public url:string='https://api-sales-app.josetovar.dev'
public setApi(productId:number):any{

  return this.http.get(`${this.url}/products/${productId}`)

}
public getData(productId:number):any{

  return this.http.get(`${this.url}/products`)

}


public putData(product:any):any{

  return this.http.put<any>(`${this.url}/products`,product)
}


public delectData(product:number):any{

  return this.http.delete<any>(`${this.url}/products/${product}`)
}


}
