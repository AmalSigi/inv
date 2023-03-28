import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SalesComponent,AddSalesComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

  ]
})
export class SalesModule { }
