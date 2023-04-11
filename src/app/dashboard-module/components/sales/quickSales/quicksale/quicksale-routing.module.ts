import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicksaleComponent } from './quicksale.component';
import { ActiveGuard } from 'src/app/core/Active/active.guard';

const routes: Routes = [
  { path: '', component: QuicksaleComponent },
  {
    path: 'quickSaleView/:id',
    loadChildren: () =>
      import('../quick-sale-view/quick-sale-view.module').then(
        (m) => m.QuickSaleViewModule
      ),
    canActivateChild: [ActiveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuicksaleRoutingModule {}
