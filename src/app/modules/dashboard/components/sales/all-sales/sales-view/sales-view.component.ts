import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SalesService } from '@saleservice/sales.service';

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
})
export class SalesViewComponent implements OnInit {
  public salesId!: number;
  public salesInv: any;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: SalesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.salesId = +params['id'];
    });
    this.mainCall();
  }

  public mainCall(): void {
    this.apiService.getSaleByID(this.salesId).subscribe((repo) => {
      this.salesInv = repo;
    });
  }
}
