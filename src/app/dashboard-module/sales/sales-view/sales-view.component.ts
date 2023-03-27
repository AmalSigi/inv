import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/Service/http.service';

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss'],
})
export class SalesViewComponent implements OnInit {
  public salesId!: number;
  public salesInv$!:Observable<any>;
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
    console.log(this.salesId);
    this.salesInv$=this.apiService.getSaleByID(this.salesId)
  }
}