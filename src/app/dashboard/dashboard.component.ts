import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

constructor(private readonly http: HttpClient){}

public  updatedStock:number | undefined ;
public  updatedPrice:number | undefined ;

public url:string='https://63bfcce3e262345656f0627b.mockapi.io/product'

public products:any
ngOnInit(): void {
    this.http
      .get<{
        id: number;
        product: string;
        price: number;
      }>(this.url)
      .subscribe((response) => {
        this.products = response;
      });


}

ini(){
  
}

edit(productId: number){

  const currproduct=this.products.filter((elem: any)=>elem.id==productId)
  this.updatedPrice=currproduct[0].price
  this.updatedStock=currproduct[0].stock


}

update(productId: number) {  

console.log(this.products)

  const price=this.updatedPrice
  const stock=this.updatedStock;
  const updatedProduct = { "price":price, "stock":stock };
  this.http.put<any>(`${this.url}/${productId}`, updatedProduct).subscribe((response) => {
    console.log(response);
    this.ngOnInit();
  });
}


 delect (productId:number){


  this.http.delete<any>(`${this.url}/${productId}`) .subscribe((responses) => {
    // this.products = responses;
    console.log(responses)
    this.ngOnInit()
  });
 }

}
