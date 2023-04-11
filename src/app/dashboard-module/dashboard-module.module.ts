import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardModuleComponent } from './root/dashboard-module.component';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';

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
