import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/Service/http.service';

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.scss'],
})
export class OverViewComponent implements OnInit {
  constructor(
    private readonly apiservice: HttpService,
    private readonly router: Router
  ) {}
  public quickSale$: Observable<any> | undefined;

  ngOnInit() {
    this.quickSale$ = this.apiservice.getQuickSale();
    this.quickSale$.subscribe((res: any) => {
      console.log(res);
    });
  }

  public addQuickSale(id: number) {
    this.router.navigate(['/dashboard/sales'], {
      queryParams: { quickSale: id },
    });
  }

  public gotoAddSale() {
    this.router.navigate(['/dashboard/sales/allsales'], {
      queryParams: { quickAdd: 'add' },
    });
  }
}
