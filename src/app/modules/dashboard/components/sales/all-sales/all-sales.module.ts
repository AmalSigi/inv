import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllsalesComponent } from './all-sales.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllsalesRoutingModule } from './all-sales-routing.module';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { SalesViewComponent } from './sales-view/sales-view.component';

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
