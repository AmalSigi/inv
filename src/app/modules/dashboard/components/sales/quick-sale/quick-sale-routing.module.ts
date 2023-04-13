import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicksaleComponent } from './quick-sale.component';
import { ActiveGuard } from 'src/app/core/Active/active.guard';
import { QuickSaleViewComponent } from './quick-sale-view/quick-sale-view.component';

const routes: Routes = [
  { path: '', component: QuicksaleComponent },
  {
    path: 'quickSaleView/:id',
    component: QuickSaleViewComponent,
    canActivateChild: [ActiveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuicksaleRoutingModule {}
