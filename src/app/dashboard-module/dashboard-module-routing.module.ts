import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModuleComponent } from './dashboard-module.component';
// import { ProductsComponent } from '../products/products.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardModuleComponent,
    children: [
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardModuleRoutingModule {}
