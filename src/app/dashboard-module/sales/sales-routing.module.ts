import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales.component';

const routes: Routes = [
  { path: '', component: SalesComponent },
  {
    path: 'salesView/:id',
    loadChildren: () =>
      import('./sales-view/sales-view.module').then((m) => m.SalesViewModule),
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
