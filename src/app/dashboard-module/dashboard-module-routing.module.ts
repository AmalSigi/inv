import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveGuard } from '../core/Active/active.guard';
import { DashboardModuleComponent } from './root/dashboard-module.component';
// import { ProductsComponent } from '../products/products.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardModuleComponent,
    children: [
      {
        path: 'overView',
        loadChildren: () =>
          import('./components/over-view/over-view.module').then(
            (m) => m.OverViewModule
          ),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./components/products/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: 'client',
        loadChildren: () =>
          import('./components/clients/client.module').then(
            (m) => m.ClientModule
          ),
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
