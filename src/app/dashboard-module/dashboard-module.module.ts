import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardModuleComponent } from './dashboard-module.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from '../add-product/add-product.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { PaginationPipe } from '../pagination.pipe';


@NgModule({
  declarations: [
    DashboardModuleComponent,
AddProductComponent,
PaginationComponent,
PaginationPipe,
    
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
ReactiveFormsModule ,
FormsModule
]
})
export class DashboardModuleModule { }
