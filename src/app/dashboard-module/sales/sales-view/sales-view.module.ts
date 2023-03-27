import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesViewRoutingModule } from './sales-view-routing.module';
import { SalesViewComponent } from './sales-view.component';


@NgModule({
  declarations: [
    SalesViewComponent
  ],
  imports: [
    CommonModule,
    SalesViewRoutingModule
  ]
})
export class SalesViewModule { }
