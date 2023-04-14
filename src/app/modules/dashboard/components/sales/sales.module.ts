import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { SalesComponent } from '@salesspage/sales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuickSaleViewComponent } from '@quickview/quick-sale-view.component';

@NgModule({
  declarations: [SalesComponent, QuickSaleViewComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class SalesModule {}
