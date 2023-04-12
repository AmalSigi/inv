import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationPipe } from 'src/app/dashboard-module/pagination/pagination.pipe';
import { PaginationComponent } from '../../dashboard-module/pagination/pagination.component';

@NgModule({
  declarations: [PaginationComponent, PaginationPipe],
  imports: [CommonModule],
  exports: [PaginationComponent, PaginationPipe],
})
export class SharedModule {}
