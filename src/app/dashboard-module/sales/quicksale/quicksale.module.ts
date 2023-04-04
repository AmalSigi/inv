import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuicksaleRoutingModule } from './quicksale-routing.module';
import { QuicksaleComponent } from './quicksale.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddQuickSalewComponent } from './add-quick-salew/add-quick-salew.component';

@NgModule({
  declarations: [QuicksaleComponent, AddQuickSalewComponent],
  imports: [CommonModule, QuicksaleRoutingModule, SharedModule],
})
export class QuicksaleModule {}
