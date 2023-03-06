// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Observable } from 'rxjs/internal/Observable';
// // import { HttpService } from '../Service/http.service';
// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {

//   constructor(private readonly http: HttpClient) {}

//   public updatedStock: number | undefined;
//   public updatedPrice: number | undefined;
//   public selectedProductId: number | undefined;


//   public url = 'https://63bfcce3e262345656f0627b.mockapi.io/product';

//   public products: any;
//   // public checkboxes: { [key: number]: boolean } = {};
//   public products$!: Observable<any>;
//   public updateProductForm: FormGroup = new FormGroup({})
//   ngOnInit(): void {
//     this.products$=  this.http
//       .get<{
      
//         id: number;
//         product: string;
//         price: number;
//         stock: number;
//       }>(this.url);

//        this.products$ .subscribe((response) => {
//         this.products = response;

//         response.map((product:any)=>{
//           this.updateProductForm.addControl(`${product.id}`,new FormGroup({
//             price: new FormControl(product.price, Validators.min(0)),
//             stock: new FormControl(product.stock, Validators.min(0)),
//           }))
//         })


// console.log(this.products)
// console.log(this.products$)

      
//         // this.products.forEach((product: any) => {
//         //   this.checkboxes[product.id] = false;
//         // });
//       });
//   }

//   // edit(productId: number) {
//   //   if (this.checkboxes[productId]) {
//   //     this.selectedProductId = productId;
//   //     const currproduct = this.products.filter(
//   //       (elem: any) => elem.id == productId
//   //     );
//   //     this.updatedPrice = currproduct[0].price;
//   //     this.updatedStock = currproduct[0].stock;
//   //   }
//   // }


//   public setUpdatedValues(product: any): void {
//     const updatedValues = {
//       ...product,
//       ...this.updateProductForm.controls[product.id].value,
//     };
//     this.http
//     .put<any>(`${this.url}/${product.id}`, updatedValues)
//     .subscribe((response) => {
//       console.log(response);
//       this.ngOnInit();
//     });

//   }

//   }
//   public setDisableValue(product: any): boolean {
//     const { price, stock } = this.updateProductForm.controls[product.id].value;

//     return price == product.price && stock == product.stock;
//   }



//   // update(productId: number) {
//   //   // if (this.checkboxes[productId]) {
//   //     const price = this.updatedPrice;
//   //     const stock = this.updatedStock;
//   //     const updatedProduct = { price: price, stock: stock };
//   //     this.http
//   //       .put<any>(`${this.url}/${productId}`, updatedProduct)
//   //       .subscribe((response) => {
//   //         console.log(response);
//   //         this.ngOnInit();
//   //       });
//   //   // }
//   // }

//   delete(product: number) {
// // console.log(this.checkboxes[productId])

//     // if (this.checkboxes[productId]) {
//       this.http
//         .delete<any>(`${this.url}/${product}`)
//         .subscribe((responses) => {
//           // console.log(responses);
//           this.ngOnInit();
//         });
//     // }
//   }






  // onCheckboxChange(product: number, anyEvent:any) {
  //   // console.log(anyEvent.target.checked)

  //   // for (const key in this.checkboxes) {
  //   //   if (this.checkboxes.hasOwnProperty(key)) {
  //   //     if (+key !== productId) {
  //   //       this.checkboxes[key] = anyEvent.target.checked;
  //   //     }
       
  //   //   }
  //   // }
  
  // }
// }





import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { HttpService } from '../Service/http.service';
// import { ApiService } from '../http/http-api.service';

@Component({
  selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,private toastr: ToastrService, private serviceApi : HttpService
  ) {}

  public url: string = 'https://api-sales-app.josetovar.dev/products';
  public products$!: Observable<any>;

  public updateProductForm: FormGroup = new FormGroup({});
  public checkboxes: { [key: number]: boolean } = {};

  ngOnInit(): void {
    this.products$ = this.http.get<{
      id: number;
      name: string;
      price: number;
      sku: string;
      stock: number;
    }>(this.url);

// console.log(this.products$)
    this.products$.subscribe((products) => {
      products.map((product: any) => {
        this.updateProductForm.addControl(
          `${product.id}`,
          new FormGroup({
            price: new FormControl(formatCurrency(product.price, 'en-US', '$')),
            // price: new FormControl(product.price, Validators.min(0)),
            stock: new FormControl(product.stock, Validators.min(0)),
          })
        );
      });

      products.forEach((product: any) => {
        this.checkboxes[product.id] = false;
      });

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
      console.log(this.updateProductForm.controls[product.id.toString()].get('price')
      )
  
  }

  public getValueFromCurrency(value: string): number {
    let price: number;

    if (value.includes('$')) {
      price = Number(value.substring(1).replaceAll(',', ''));
    } else {
      price = Number(value.replaceAll(',', ''));
    }

    // Methods for string
    // 1. includes
    // 2. substring()
    // 3. replaceAll

    return price;
  }





  success(){
    this.toastr.success('Product updated successfully!', 'Success',{ timeOut:3000,
      progressBar:true,
      progressAnimation:'decreasing',
      positionClass:'toast-top-right', 
      closeButton:true});
  
  }

  public setUpdatedValues(product: any): void {
    const price=+(this.updateProductForm.controls[product.id].value.price.replaceAll("$",'').replaceAll(",",''))
    const stock=this.updateProductForm.controls[product.id].value.stock
        const value ={price,stock}
          console.log(product)
        const updatedValues = {
          ...product,
          ...value,
          };
          console.log(updatedValues)

      this.serviceApi.putData(updatedValues).subscribe((response: any) => {
        this.success()
          this.http.get<any>(`${this.url}`).subscribe((response) => {
              console.log(response);
                this.products$=of(response)
                });
            });
  
  }

  public setDisableValueForUpdate(product: any): boolean {
    const { price, stock } = this.updateProductForm.controls[product.id].value;
        if(this.checkboxes[product.id])
            if(!(+price.replaceAll("$","").replaceAll(',','') == product.price && stock == product.stock))
              return false
        return true
  }


  

  onCheckboxChange(product: number, anyEvent:any) {
    console.log(anyEvent.target.checked,product)
    for (const key in this.checkboxes) {
      // console.log(key)
      if (this.checkboxes.hasOwnProperty(key)) {
        if (+key !== product) {
          this.checkboxes[product] = anyEvent.target.checked;

        }
       
      }
    }
  
  console.log(this.checkboxes)
  
  }


  delete(product: number) {
console.log(this.checkboxes[product])
    if (this.checkboxes[product]) {
      this.serviceApi.delectData(product).subscribe((responses: any) => {
          console.log(responses);
          // this.products$=of(responses);
         this.http
          .get<any>(`${this.url}`)
          .subscribe((responses) => {
            console.log(responses);
            this.products$=of(responses);
          });
        });
    }
  }

  public setDisableValueForDelect(product: number):boolean{
    if(this.checkboxes[product])
    return false
    return true
      }
}