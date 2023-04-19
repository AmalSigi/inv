import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SalesService } from '@saleservice/sales.service';
import { Toastr } from '@service/toastr.service';

@Component({
  selector: 'app-quick-sale',
  templateUrl: './quick-sale.component.html',
})
export class QuicksaleComponent implements OnInit {
  public quicksale$!: Observable<any>;
  currentPage: number = 1;
  pageSize: number = 5;
  pageLength!: number;
  public showmodel1: boolean = false;
  public showmodel2: boolean = false;

  constructor(
    private readonly apiService: SalesService,
    private readonly router: Router,
    private readonly toastr: Toastr
  ) {}
  ngOnInit(): void {
    this.main();
  }

  public main() {
    this.quicksale$ = this.apiService.getQuickSale();
    this.quicksale$.subscribe((reso: any) => {});
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
  public modelUnShowAdd(value: boolean): void {
    this.showmodel1 = value;
    this.showmodel2 = value;
  }
  public modelUnShowUpdate(value: boolean): void {
    this.showmodel2 = value;
  }

  public modelShowAdd(): void {
    this.showmodel1 = true;
  }
  public modelShowUpdate(event: any): void {
    const tdId = 'update';
    if (event.target['id'] === tdId) {
      console.log(`Click function disabled for ${tdId}`);
      return;
    }
    this.showmodel2 = true;
  }

  public delete(id: number) {
    this.apiService.deleteQuickSale(id).subscribe({
      next: () => {
        this.toastr.delete();
        this.main();
      },
      error: () => {},
      complete: () => {},
    });
  }
}
