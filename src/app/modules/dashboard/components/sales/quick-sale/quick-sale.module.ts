import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicksaleComponent } from './quick-sale.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuicksaleRoutingModule } from './quick-sale-routing.module';
import { AddQuickSalewComponent } from './add-quick-sale/add-quick-sale.component';

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
