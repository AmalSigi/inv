
import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of } from 'rxjs';
import { HttpService } from '../Service/http.service';
import { Toastr } from '../Service/toastr.service';

@Component({
  selector: 'app-dashboard-module',
  templateUrl: './dashboard-module.component.html',
  styleUrls: ['./dashboard-module.component.scss'],
})
export class DashboardModuleComponent implements OnInit{
  currentPage: number=1;
  pageSize: number=5;
  pageLength!:number
 constructor(
    private readonly http: HttpClient,private toastr: Toastr, private serviceApi : HttpService
  ) {}

  public url: string = 'https://api-sales-app.josetovar.dev/products';
  public products$!: Observable<any>;

  public updateProductForm: FormGroup = new FormGroup({});
  public checkboxes: { [key: number]: boolean } = {};
public checkBool :boolean= false
  ngOnInit(): void {
    this.products$ = this.http.get<{
      id: number;
      name: string;
      price: number;
      sku: string;
      stock: number;
      active:boolean
    }>(this.url);

    this.products$.subscribe((products) => {
      products.map((product: any) => {
        this.updateProductForm.addControl(
          `${product.id}`,
          new FormGroup({
            price: new FormControl(formatCurrency(product.price, 'en-US', '$')),
            editbool:new FormControl(product.active),
            // price: new FormControl(product.price, Validators.min(0)),
            stock: new FormControl(product.stock, Validators.min(0)),
          })
          
        );

      });
      // products.forEach((product: any) => {
      //   this.checkboxes[product.id] = false;
      // });

    });

  }


  public setFormatCurrency(product: any, event: any): void {
    const price = formatCurrency(
      this.getValueFromCurrency(event.target.value),
      'en-US',
      '$'
      );

    this.updateProductForm.controls[product.id.toString()]
      .get('price')
      ?.setValue(price);
}

  public getValueFromCurrency(value: string): number {
    let price: number;
    if (value.includes('$')) {
      price = Number(value.substring(1).replaceAll(',', ''));
    } else {
      price = Number(value.replaceAll(',', ''));
    }
    return price;
  }

  public setUpdatedValues(product: any): void {
    const price=+(this.updateProductForm.controls[product.id].value.price.replaceAll("$",'').replaceAll(",",''))
    const stock=this.updateProductForm.controls[product.id].value.stock
        const value ={price,stock}
        const updatedValues = {
          ...product,
           ...value,
          };

      this.serviceApi.putData(updatedValues).subscribe((response: any) => {
        this.toastr.update()
          this.http.get<any>(`${this.url}`).subscribe((response) => {
                this.products$=of(response)
                });
            });
  
  }

  public setDisableValueForUpdate(product: any): boolean {
    const { price, stock } = this.updateProductForm.controls[product.id].value;
    const {editbool}=this.updateProductForm.controls[product.id].value

        if(editbool){
          if (!(+price.replaceAll("$","").replaceAll(',','') == product.price && stock == product.stock))
          return false
        }
        return true
  }


  onCheckboxChange(product: any, anyEvent:any) {
      const status = anyEvent.target.checked;
      this.http.put( `https://api-sales-app.josetovar.dev/product-status/${product.id}?status=${status}`,{}).subscribe(reponse=>{
        if(reponse){
        }
      });

  }


  delete(product: number ) {
      this.serviceApi.delectData(product).subscribe((responses: any) => {
         this.http
          .get<any>(`${this.url}`)
          .subscribe((responses) => {
            this.products$=of(responses);
          });
          this.toastr.delete()
      }); 
  }

  public setDisableValueForDelect(product: any):boolean{
    if(product.active)
    return true
    return false
  }

public setFiltersStatus(active:any):void {
  this.products$=this.http.get<any>(this.url).pipe(map((products:any)=>{
    if(active.target.value){
      return products.filter((product:any)=>product.active.toString()===active.target.value)
    }
    else{
      return products
    }
  }))
}  
public setFiltersStock(active:any):void {
  this.products$=this.http.get<any>(this.url).pipe(map((products:any)=>{
    if(active.target.value==1){
      return products.filter((product:any)=>product.stock>0)
    }
    else if(active.target.value==2){
      return products.filter((product:any)=>product.stock==0)
    }
    else{
      return products
    }
  }))
}  


onPagination(event: { currentPage: number, pageSize: number }) {
  // console.log("dash"+this.currentPage)
  // console.log("dash2"+event.currentPage)

  this.currentPage = event.currentPage;
  this.pageSize = event.pageSize;
}

}
