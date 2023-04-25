import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '@saleservice/sales.service';
import { Isale } from '@interface/sale/sale';
@Component({
  selector: 'app-quick-sale-view',
  templateUrl: './quick-sale-view.component.html',
})
export class QuickSaleViewComponent {
  public quickSaleId: any;
  public quickSale!: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private salesService: SalesService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.quickSaleId = +params['id'];

      this.salesService
        .getQuickSaleById(this.quickSaleId)
        .subscribe((respo: Isale[]) => {
          // console.log(respo);
          this.quickSale = respo;
        });
    });
  }
}
