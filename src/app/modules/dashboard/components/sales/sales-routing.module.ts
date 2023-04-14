import { NgModule } from '@angular/core';
import { ActiveGuard } from '@guards/active.guard';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from '@salesspage/sales.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      {
        path: 'quicksale',
        loadChildren: () =>
          import('./quick-sale/quick-sale.module').then(
            (m) => m.QuicksaleModule
          ),
      },
      {
        path: 'allsales',
        loadChildren: () =>
          import('./all-sales/all-sales.module').then((m) => m.AllsalesModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./all-sales/all-sales.module').then((m) => m.AllsalesModule),
      },
    ],
    canActivateChild: [ActiveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
