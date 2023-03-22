import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardModuleComponent } from './dashboard-module.component';

@NgModule({
  declarations: [DashboardModuleComponent],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DashboardModuleModule {}
