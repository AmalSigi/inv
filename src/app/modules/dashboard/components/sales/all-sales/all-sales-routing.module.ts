import { NgModule } from '@angular/core';
import { ActiveGuard } from '@guards/active.guard';
import { RouterModule, Routes } from '@angular/router';
import { AllsalesComponent } from './all-sales.component';
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
