import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  constructor() {}

  totalPage!: number;
  @Input() data: any;
  @Output() pagination: EventEmitter<any> = new EventEmitter<any>();

  currentPage: number = 1;
  pageSize: number = 5;

  onPagination(event: any) {
    const value = event.target.value;
    switch (value) {
      case 'Previous':
        if (this.currentPage-- > 1) this.paginationEmit(this.currentPage);
        else this.currentPage = 1;
        break;
      case 'Next':
        // console.log(this.currentPage,value)
        if (this.currentPage < this.totalPage) {
          this.currentPage++;
          this.paginationEmit(this.currentPage);
        }
        break;
      default:
        if (this.currentPage <= this.totalPage) {
          this.currentPage = +event.target.value;
          this.paginationEmit(this.currentPage);
        }
      // console.log(this.totalPage)
      // console.log(this.currentPage)
    }
  }

  paginationEmit(currentPageValue: number) {
    this.pagination.emit({
      currentPage: currentPageValue,
      pageSize: this.pageSize,
    });
  }

  ngOnChanges(): void {
    this.data.subscribe((response: any) => {
      this.totalPage = Math.ceil(response.length / this.pageSize);
    });

    this.currentPage = 1;
    this.paginationEmit(this.currentPage);
  }
}
