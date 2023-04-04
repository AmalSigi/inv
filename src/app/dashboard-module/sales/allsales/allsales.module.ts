import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllsalesRoutingModule } from './allsales-routing.module';
import { AllsalesComponent } from './allsales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddSalesComponent } from '../add-sales/add-sales.component';

@NgModule({
  declarations: [AllsalesComponent, AddSalesComponent],
  imports: [
    CommonModule,
    AllsalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AllsalesModule {}
