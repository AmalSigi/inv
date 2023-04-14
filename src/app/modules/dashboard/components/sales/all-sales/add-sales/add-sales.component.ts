import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, map } from 'rxjs';
import { Toastr } from '@service/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@commonservice/http.service';
import { LocalStoService } from '@service/local-sto.service';
import { MainServiceService } from '@service/main-service.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
})
export class AddSalesComponent implements OnInit, OnDestroy {
  public url: string = 'https://api-sales-app.josetovar.dev';

  @Output() childEvent = new EventEmitter<boolean>();
  public serachView: boolean = false;
  public productView: boolean = false;
  public confirmBox: boolean = true;
  public totalView: boolean = true;

  public clientName: any = '';
  public productName: any = '';
  public selectedProduct: any;
  public client$!: Observable<any>;
  public product$!: Observable<any>;

  public total: number = 0;
  constructor(
    private readonly apiService: HttpService,
    private readonly main: MainServiceService,
    private readonly toastr: Toastr,
    private readonly local: LocalStoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.client$ = this.apiService.getClients();
    this.product$ = this.apiService.getProduct();

    if (this.local.getvalue()) {
      this.saleForm = this.local.getvalue();
    }
    this.route.queryParams.subscribe((params: { [source: string]: string }) => {
      switch (true) {
        case Boolean(params['source']):
          this.productView = true;
          this.productName = '';
          this.confirmBox = false;
          break;
        case Boolean(params['quickSale']):
          this.productView = true;
          this.products.clear();
          this.quickSale(params['quickSale']);
          break;
        case Boolean(params['quickAdd']):
          this.productView = true;
          this.productView = true;
          this.productName = '';
          this.confirmBox = false;
          this.products.clear();

          break;
        default:
          break;
      }
    });
  }

  public quickSale(id: any): void {
    this.apiService.getQuickSaleById(id).subscribe((res) => {
      res.products.forEach((element: any) => {
        this.addProduct(element);
      });
    });
  }

  public saleForm: FormGroup = new FormGroup({
    client_id: new FormControl('', Validators.required),
    products: new FormArray([]),
  });

  get products(): FormArray {
    return this.saleForm.controls['products'] as FormArray;
  }

  public addSales(): void {
    this.productView = true;
  }
  public addProduct(product: any): void {
    this.confirmBox = false;
    const isObjectInArray = this.products.value.some(
      (obj: any) => JSON.stringify(obj.id) === JSON.stringify(product.id)
    );
    if (!isObjectInArray) {
      this.products.push(
        new FormGroup({
          // name:new FormControl(product.name, Validators.required),
          id: new FormControl(product.id, Validators.required),
          price: new FormControl(product.price, Validators.required),
          quantity: new FormControl(1, [
            Validators.required,
            Validators.min(0),
            Validators.max(product.stock),
          ]),
        })
      );
      this.updateOrderTotal();
    }
  }
  public removeSale(formInedx: number): void {
    this.products.removeAt(formInedx);
  }

  public modelUnShow(): void {
    const value: boolean = false;
    this.childEvent.emit(value);
  }

  public getClientName(event: any): void {
    this.clientName = event.target.value;
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
  public getClientId(
    clientId: number,
    first_name: string,
    last_name: string
  ): void {
    this.addSales();
    this.serachView = false;

    this.saleForm.get('client_id')?.setValue(clientId);
    this.clientName = first_name + last_name;
  }
  public getProductName(event: any): void {
    this.productName = event.target.value;
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
  }
  public quanityDec(index: number): void {
    if (this.products.at(index).get('quantity')?.value > 0) {
      this.products.controls[index].patchValue({
        quantity: this.products.at(index).get('quantity')?.value - 1,
      });
    }
    this.updateOrderTotal();
  }
  public quanityInc(index: number): void {
    this.products.controls[index].patchValue({
      quantity: this.products.at(index).get('quantity')?.value + 1,
    });
    this.updateOrderTotal();
  }

  public save(): void {
    this.modelUnShow();
    if (this.saleForm.valid) {
      this.apiService.postSale(this.saleForm.value).subscribe({
        next: () => {
          this.main.clickEventActivated();
          this.toastr.add();
        },
        error: () => {},
        complete: () => {},
      });
    } else {
      this.toastr.error();
    }
  }
  public addNewClient(): void {
    this.router.navigate(['/dashboard/client'], {
      queryParams: { source: 'newsale' },
    });
  }

  public updateOrderTotal(): number {
    this.total = 0;
    for (let product of this.products.controls) {
      this.total = this.total + product.value.quantity * product.value.price;
    }
    return this.total;
  }

  ngOnDestroy(): void {
    this.local.store(this.saleForm);
  }
}
