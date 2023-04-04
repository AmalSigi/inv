import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales.component';
import { ActiveGuard } from 'src/app/Active/active.guard';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      {
        path: 'quicksale',
        loadChildren: () =>
          import('./quicksale/quicksale.module').then((m) => m.QuicksaleModule),
      },
      {
        path: 'allsales',
        loadChildren: () =>
          import('./allsales/allsales.module').then((m) => m.AllsalesModule),
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
