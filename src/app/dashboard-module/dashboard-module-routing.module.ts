import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModuleComponent } from './dashboard-module.component';
// import { ProductsComponent } from '../products/products.component';
import { ProductComponent } from './product/product.component';
import { ActiveGuard } from '../Active/active.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardModuleComponent,
    children: [
      {
        path: 'overView',
        loadChildren: () =>
          import('./over-view/over-view.module').then((m) => m.OverViewModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'client',
        loadChildren: () =>
          import('./client/client.module').then((m) => m.ClientModule),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./sales/sales.module').then((m) => m.SalesModule),
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
