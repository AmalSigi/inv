import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveGuard } from 'src/app/core/Active/active.guard';
import { SalesComponent } from '../../pages/sales/sales.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      {
        path: 'quicksale',
        loadChildren: () =>
          import('./quickSales/quicksale.module').then(
            (m) => m.QuicksaleModule
          ),
      },
      {
        path: 'allsales',
        loadChildren: () =>
          import('./allSale/allsales.module').then((m) => m.AllsalesModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./allSale/allsales.module').then((m) => m.AllsalesModule),
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