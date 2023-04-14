import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SalesService } from '@saleservice/sales.service';

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
})
export class OverViewComponent implements OnInit {
  constructor(
    private readonly apiservice: SalesService,
    private readonly router: Router
  ) {}
  public quickSale$: Observable<any> | undefined;

  ngOnInit(): void {
    this.quickSale$ = this.apiservice.getQuickSale();
    this.quickSale$.subscribe((res: any) => {
      console.log(res);
    });
  }

  public addQuickSale(id: number): void {
    this.router.navigate(['/dashboard/sales'], {
      queryParams: { quickSale: id },
    });
  }

  public gotoAddSale(): void {
    this.router.navigate(['/dashboard/sales/allsales'], {
      queryParams: { quickAdd: 'add' },
    });
  }
}
