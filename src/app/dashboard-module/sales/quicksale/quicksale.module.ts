import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuicksaleRoutingModule } from './quicksale-routing.module';
import { QuicksaleComponent } from './quicksale.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddQuickSalewComponent } from './add-quick-salew/add-quick-salew.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuicksaleComponent, AddQuickSalewComponent],
  imports: [
    CommonModule,
    QuicksaleRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class QuicksaleModule {}
