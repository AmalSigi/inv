import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '@service/http.service';

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss'],
})
export class SalesViewComponent implements OnInit {
  public salesId!: number;
  public salesInv: any;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: HttpService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.salesId = +params['id'];
    });
    this.mainCall();
  }

  public mainCall() {
    // console.log(this.salesId);
    this.apiService.getSaleByID(this.salesId).subscribe((repo) => {
      this.salesInv = repo;
    });
  }
}
