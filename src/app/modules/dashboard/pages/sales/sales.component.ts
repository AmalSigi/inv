import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SalesService } from '@saleservice/sales.service';
import { MainServiceService } from '@service/main-service.service';
import { Isale, Iquicksale } from '@interface/sale/sale';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit {
  public sales$!: Observable<Isale>;
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
    this.sales$.subscribe((respo: Isale) => {});
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
