import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ClientComponent } from '@clientspage/client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from '@productsspage/product.component';
import { DashboardModuleComponent } from './root/dashboard-module.component';
import { AddClientComponent } from '@clients/add-client/add-client.component';
import { OverViewComponent } from './pages/over-view/over-view.component';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { ClientViewComponent } from '@clients/client-view/client-view.component';
import { UpdateClientComponent } from '@clients/update-client/update-client.component';
import { AddProductComponent } from '@products/add-product/add-product.component';

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
