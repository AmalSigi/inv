import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardModuleComponent } from './dashboard-module.component';
// import { AddProductComponent } from '../add-product/add-product.component';
// import { NavigationComponent } from '../navigation/navigation.component';


@NgModule({
  declarations: [
    DashboardModuleComponent,
// AddProductComponent,
// PaginationPipe,
// NavigationComponent,
// PaginationComponent,

    
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
ReactiveFormsModule ,
FormsModule
]
})
export class DashboardModuleModule { }
