import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllsalesComponent } from '@sales/all-sales/all-sales.component';
import { AllsalesRoutingModule } from '@sales/all-sales/all-sales-routing.module';
import { AddSalesComponent } from '@sales/all-sales/add-sales/add-sales.component';
import { SalesViewComponent } from '@sales/all-sales/sales-view/sales-view.component';

@NgModule({
  declarations: [AllsalesComponent, AddSalesComponent, SalesViewComponent],
  imports: [
    CommonModule,
    AllsalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AllsalesModule {}
