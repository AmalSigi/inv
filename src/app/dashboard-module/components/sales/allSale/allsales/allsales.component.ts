import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/Service/http.service';
import { MainServiceService } from 'src/app/core/Service/main-service.service';

@Component({
  selector: 'app-allsales',
  templateUrl: './allsales.component.html',
})
export class AllsalesComponent implements OnInit {
  public sales$!: Observable<any>;
  public showmodel: boolean = false;
  currentPage: number = 1;
  pageSize: number = 5;
  pageLength!: number;
  constructor(
    private readonly apiService: HttpService,
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

  public mainCall() {
    this.sales$ = this.apiService.getSale();
    this.sales$.subscribe((respo) => {
      // console.log(respo)
    });
  }
  public convDate(date: any) {}

  public modelShow() {
    // this.upClient = client;
    this.showmodel = true;
  }

  public modelUnShow(value: boolean) {
    this.showmodel = value;
  }
  onPagination(event: { currentPage: number; pageSize: number }) {
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
  }
}
