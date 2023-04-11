import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/Service/http.service';

@Component({
  selector: 'app-quicksale',
  templateUrl: './quicksale.component.html',
})
export class QuicksaleComponent implements OnInit {
  public quicksale$!: Observable<any>;
  currentPage: number = 1;
  pageSize: number = 5;
  pageLength!: number;
  public showmodel: boolean = false;
  constructor(
    private readonly apiService: HttpService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.quicksale$ = this.apiService.getQuickSale();
    this.quicksale$.subscribe((reso: any) => {
      console.log(reso);
    });
  }

  public addQuickSale(id: number) {
    this.router.navigate(['/dashboard/sales/allsales'], {
      queryParams: { quickSale: id },
    });
  }
  onPagination(event: { currentPage: number; pageSize: number }) {
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
  }
  public modelUnShow(value: boolean) {
    this.showmodel = value;
  }

  public modelShow() {
    this.showmodel = true;
  }
}
