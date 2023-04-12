import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllsalesComponent } from './allsales.component';
import { ActiveGuard } from 'src/app/core/Active/active.guard';
import { SalesViewComponent } from './sales-view/sales-view.component';

const routes: Routes = [
  { path: '', component: AllsalesComponent },
  {
    path: 'salesView/:id',
    component: SalesViewComponent,
    canActivateChild: [ActiveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllsalesRoutingModule {}
