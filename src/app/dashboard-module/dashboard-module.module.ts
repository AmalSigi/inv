import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../core/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './pages/clients/client.component';
import { ProductComponent } from './pages/products/product.component';
import { DashboardModuleComponent } from './root/dashboard-module.component';
import { OverViewComponent } from './components/over-view/over-view.component';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { ClientViewComponent } from './components/clients/client-view/client-view.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { UpdateClientComponent } from './components/clients/update-client/update-client.component';

@NgModule({
  declarations: [
    DashboardModuleComponent,
    OverViewComponent,
    ProductComponent,
    AddProductComponent,
    ClientComponent,
    AddClientComponent,
    UpdateClientComponent,
    ClientViewComponent,
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
