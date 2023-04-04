import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickSaleViewRoutingModule } from './quick-sale-view-routing.module';
import { QuickSaleViewComponent } from './quick-sale-view.component';


@NgModule({
  declarations: [
    QuickSaleViewComponent
  ],
  imports: [
    CommonModule,
    QuickSaleViewRoutingModule
  ]
})
export class QuickSaleViewModule { }
