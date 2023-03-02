
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private readonly http:HttpClient) { }

public url:string='https://63bfcce3e262345656f0627b.mockapi.io'
public setApi(productId:number):any{

  return this.http.get(`${this.url}/product/${productId}`)

}



}
