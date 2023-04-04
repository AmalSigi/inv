import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverViewRoutingModule } from './over-view-routing.module';
import { OverViewComponent } from './over-view.component';

@NgModule({
  declarations: [OverViewComponent],
  imports: [CommonModule, OverViewRoutingModule],
})
export class OverViewModule {}
