import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SalesService } from '@saleservice/sales.service';
import { Isale } from '@interface/sale/sale';
@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
})
export class SalesViewComponent implements OnInit {
  public salesId!: number;
  public salesInv: any;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly salesService: SalesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.salesId = +params['id'];
    });
    this.mainCall();
  }

  public mainCall(): void {
    this.salesService.getSaleByID(this.salesId).subscribe((repo: Isale) => {
      this.salesInv = repo;
    });
  }
}
