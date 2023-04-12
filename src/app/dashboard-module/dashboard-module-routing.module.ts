import { NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveGuard } from '../core/Active/active.guard';
import { ClientComponent } from './pages/clients/client.component';
import { ProductComponent } from './pages/products/product.component';
import { DashboardModuleComponent } from './root/dashboard-module.component';
import { OverViewComponent } from './components/over-view/over-view.component';
import { ClientViewComponent } from './components/clients/client-view/client-view.component';
// import { ProductsComponent } from '../products/products.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardModuleComponent,
    children: [
      {
        path: 'overView',
        component: OverViewComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'client',
        component: ClientComponent,
      },
      {
        path: 'client/:id',
        component: ClientViewComponent,
        canActivate: [ActiveGuard],
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./components/sales/sales.module').then((m) => m.SalesModule),
      },
    ],
    canActivateChild: [ActiveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardModuleRoutingModule {}
