import { ActiveGuard } from '@guards/active.guard';
import { NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from '@clientspage/client.component';
import { ProductComponent } from '@productsspage/product.component';
import { DashboardModuleComponent } from './root/dashboard-module.component';
import { OverViewComponent } from './pages/over-view/over-view.component';
import { ClientViewComponent } from '@clients/client-view/client-view.component';

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
        // canActivate: [ActiveGuard],
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./components/sales/sales.module').then((m) => m.SalesModule),
      },
    ],
    // canActivateChild: [ActiveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardModuleRoutingModule {}
