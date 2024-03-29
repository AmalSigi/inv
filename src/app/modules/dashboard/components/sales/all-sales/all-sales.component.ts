import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SalesService } from '@saleservice/sales.service';
import { MainServiceService } from '@service/main-service.service';

@Component({
  selector: 'app-allsales',
  templateUrl: './all-sales.component.html',
})
export class AllsalesComponent implements OnInit {
  public sales$!: Observable<any>;
  public showmodel: boolean = false;
  currentPage: number = 1;
  pageSize: number = 5;
  pageLength!: number;
  constructor(
    private readonly salesService: SalesService,
    private readonly main: MainServiceService,
    private readonly route: ActivatedRoute
  ) {}
  public mainServiceSubscription: Subscription = this.main
    .getClickEvent()
    .subscribe(() => {
      this.mainCall();
    });
  ngOnInit(): void {
    this.mainCall();
    this.route.queryParams.subscribe((params: { [source: string]: string }) => {
      switch (true) {
        case Boolean(params['source']):
        case Boolean(params['quickSale']):
        case Boolean(params['quickAdd']):
          this.showmodel = true;
          break;
        default:
          break;
      }
    });
  }

  public mainCall(): void {
    this.sales$ = this.salesService.getSale();
    this.sales$.subscribe((respo) => {});
  }

  public modelShow(): void {
    // this.upClient = client;
    this.showmodel = true;
  }

  public modelUnShow(value: boolean): void {
    this.showmodel = value;
  }
  public onPagination(event: { currentPage: number; pageSize: number }): void {
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
  }
}
