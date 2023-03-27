import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/Service/http.service';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss'],
})
export class AddSalesComponent implements OnInit {
  public url: string = 'https://api-sales-app.josetovar.dev';

  @Output() childEvent = new EventEmitter<boolean>();
  public clientName: any;
  public client$!: Observable<any>;
  constructor(private readonly apiService: HttpService, private readonly http:HttpClient) {}
  ngOnInit(): void {
    this.client$ = this.apiService.getClients();
  }
  public saleForm: FormGroup = new FormGroup({
    client_id: new FormControl('', Validators.required),
    products: new FormArray([]),
  });

  get products(): FormArray {
    return this.saleForm.controls['products'] as FormArray;
  }

  public addSales() {
    this.products.push(
      new FormGroup({
        productId: new FormControl(null, Validators.required),
        quantity: new FormControl(null, Validators.required),
      })
    );
  }

  public removeSale(formInedx: number): void {
    this.products.removeAt(formInedx);
  }

  public modelUnShow() {
    const value: boolean = false;
    this.childEvent.emit(value);
  }

  public getClientName() {
    this.client$ = this.client$.pipe(
      map((products: any) => {
        return products.filter((product: any) =>
          product.first_name.toLowerCase().includes(this.clientName.toLowerCase())|| product.last_name.toLowerCase().includes(this.clientName.toLowerCase())
        );
      })
    );

  }
  public getClientId(clientId:number){
    this.saleForm.get('clientId')?.setValue(clientId)
  }
public save(){
  console.log(this.saleForm.value)

  this.http.post(`${this.url}/sales`,this.saleForm.value).subscribe((respo)=>{
  })
}

}
