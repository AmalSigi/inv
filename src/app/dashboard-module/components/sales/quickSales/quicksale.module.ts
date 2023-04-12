import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicksaleComponent } from './quicksale.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuicksaleRoutingModule } from './quicksale-routing.module';
import { AddQuickSalewComponent } from './add-quick-salew/add-quick-salew.component';

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
