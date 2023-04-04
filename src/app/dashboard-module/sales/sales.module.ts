import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';

@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class SalesModule {}
