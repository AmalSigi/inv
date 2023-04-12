import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardModuleComponent } from './root/dashboard-module.component';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { OverViewComponent } from './components/over-view/over-view.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductComponent } from './pages/products/product.component';
import { SharedModule } from '../core/shared/shared.module';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { UpdateClientComponent } from './components/clients/update-client/update-client.component';
import { ClientComponent } from './pages/clients/client.component';

@NgModule({
  declarations: [
    DashboardModuleComponent,
    OverViewComponent,
    ProductComponent,
    AddProductComponent,
    ClientComponent,
    AddClientComponent,
    UpdateClientComponent,
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class DashboardModuleModule {}
