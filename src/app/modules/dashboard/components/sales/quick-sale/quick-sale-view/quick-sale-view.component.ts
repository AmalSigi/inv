import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '@saleservice/sales.service';

@Component({
  selector: 'app-quick-sale-view',
  templateUrl: './quick-sale-view.component.html',
})
export class QuickSaleViewComponent {
  public quickSaleId: any;
  public quickSale!: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: SalesService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.quickSaleId = +params['id'];

      this.apiService
        .getQuickSaleById(this.quickSaleId)
        .subscribe((respo: any[]) => {
          // console.log(respo);
          this.quickSale = respo;
        });
    });
  }
}
