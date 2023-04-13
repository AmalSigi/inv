import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@service/http.service';

@Component({
  selector: 'app-quick-sale-view',
  templateUrl: './quick-sale-view.component.html',
})
export class QuickSaleViewComponent {
  public quickSaleId: any;
  public quickSale!: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: HttpService
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
