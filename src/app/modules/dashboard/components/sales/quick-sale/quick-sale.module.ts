import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuicksaleComponent } from '@sales/quick-sale//quick-sale.component';
import { QuicksaleRoutingModule } from '@sales/quick-sale/quick-sale-routing.module';
import { AddQuickSalewComponent } from '@sales/quick-sale/add-quick-sale/add-quick-sale.component';
import { UpdateQuickSalesComponent } from './update-quick-sales/update-quick-sales.component';
@NgModule({
  declarations: [QuicksaleComponent, AddQuickSalewComponent, UpdateQuickSalesComponent],
  imports: [
    CommonModule,
    QuicksaleRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class QuicksaleModule {}
