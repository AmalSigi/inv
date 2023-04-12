import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRoutingModule } from './sales-routing.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesComponent } from '../../pages/sales/sales.component';
import { QuickSaleViewComponent } from './quickSales/quick-sale-view/quick-sale-view.component';

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
