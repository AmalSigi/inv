import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardModuleComponent } from './dashboard-module.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from '../add-product/add-product.component';


@NgModule({
  declarations: [
    DashboardModuleComponent,
AddProductComponent
    
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
ReactiveFormsModule 
]
})
export class DashboardModuleModule { }
