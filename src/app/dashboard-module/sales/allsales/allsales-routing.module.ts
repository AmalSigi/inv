import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllsalesComponent } from './allsales.component';
import { ActiveGuard } from 'src/app/Active/active.guard';

const routes: Routes = [
  { path: '', component: AllsalesComponent },
  {
    path: 'salesView/:id',
    loadChildren: () =>
      import('../sales-view/sales-view.module').then((m) => m.SalesViewModule),
    canActivateChild: [ActiveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllsalesRoutingModule {}
