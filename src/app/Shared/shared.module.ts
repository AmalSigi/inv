import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationPipe } from './Pipe/pagination/pagination.pipe';

@NgModule({
  declarations: [PaginationComponent, PaginationPipe],
  imports: [CommonModule],
  exports: [PaginationComponent, PaginationPipe],
})
export class SharedModule {}
