import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllsalesComponent } from './allsales.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { AllsalesRoutingModule } from './allsales-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
