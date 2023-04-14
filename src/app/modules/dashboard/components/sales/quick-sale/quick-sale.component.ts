import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SalesService } from '@saleservice/sales.service';

@Component({
  selector: 'app-quick-sale',
  templateUrl: './quick-sale.component.html',
})
export class QuicksaleComponent implements OnInit {
  public quicksale$!: Observable<any>;
  currentPage: number = 1;
  pageSize: number = 5;
  pageLength!: number;
  public showmodel: boolean = false;
  constructor(
    private readonly apiService: SalesService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.quicksale$ = this.apiService.getQuickSale();
    this.quicksale$.subscribe((reso: any) => {
      console.log(reso);
    });
  }

  public addQuickSale(id: number): void {
    this.router.navigate(['/dashboard/sales/allsales'], {
      queryParams: { quickSale: id },
    });
  }
  public onPagination(event: { currentPage: number; pageSize: number }): void {
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
  }
  public modelUnShow(value: boolean): void {
    this.showmodel = value;
  }

  public modelShow(): void {
    this.showmodel = true;
  }
}
