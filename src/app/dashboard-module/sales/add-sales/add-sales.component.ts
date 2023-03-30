import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, elementAt, map } from 'rxjs';
import { HttpService } from 'src/app/Service/http.service';
import { MainServiceService } from 'src/app/Service/main-service.service';
import { Toastr } from 'src/app/Service/toastr.service';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss'],
})
export class AddSalesComponent implements OnInit {
  public url: string = 'https://api-sales-app.josetovar.dev';

  @Output() childEvent = new EventEmitter<boolean>();
  public serachView: boolean = false;
  public productView: boolean = false;
  public clientName: any='';
  public productName: any;
  public client$!: Observable<any>;
  public product$!: Observable<any>;
  constructor(
    private readonly apiService: HttpService,
    private readonly http: HttpClient,
    private readonly main: MainServiceService,
    private readonly toastr:Toastr,
  ) {}
  ngOnInit(): void {
    this.client$ = this.apiService.getClients();
    this.product$ = this.apiService.getData();
  }
  public saleForm: FormGroup = new FormGroup({
    client_id: new FormControl('', Validators.required),
    products: new FormArray([]),
  });

  get products(): FormArray {
    return this.saleForm.controls['products'] as FormArray;
  }

  public addSales() {
    this.productView = true;
    
  }
  public addProduct(product:any){
    this.products.push(
      new FormGroup({
        id: new FormControl(product.id, Validators.required),
        quantity: new FormControl(null, [Validators.required,Validators.min(0),Validators.max(product.stock)]),
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
    if (this.clientName != '') {
      this.serachView = true;
    } else {
      this.serachView = false;
    }
    this.client$ = this.client$.pipe(
      map((clients: any) => {
        return clients.filter(
          (client: any) =>
            client.first_name
              .toLowerCase()
              .includes(this.clientName.toLowerCase()) ||
            client.last_name
              .toLowerCase()
              .includes(this.clientName.toLowerCase())
        );
      })
    );
  }
  public getClientId(clientId: number, first_name: string, last_name: string) {
    this.serachView = false;

    this.saleForm.get('client_id')?.setValue(clientId);
    this.clientName = first_name + last_name;
  }
  public getProductName() {
    this.product$ = this.product$.pipe(
      map((products: any) => {
        return products.filter(
          (product: any) =>
            product.name
              .toLowerCase()
              .includes(this.productName.toLowerCase()) &&
            product.active == true &&
            product.stock > 0
        );
      })
    );
    this.product$.subscribe((res) => {
      console.log(res);
    });
  }
  public save() {
    this.modelUnShow()
    // console.log(this.saleForm.valid);
    if(this.saleForm.valid){
      this.http.post(`${this.url}/sales`, this.saleForm.value).subscribe({
        next: () => {
          this.main.clickEventActivated();
          this.toastr.add()
        },
        error: () => {},
        complete: () => {},
      });
    }
    else{
      this.toastr.error()
    }
   
  }
 
}
