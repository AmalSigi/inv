import { NgModule } from '@angular/core';
import { ActiveGuard } from '@guards/active.guard';
import { RouterModule, Routes } from '@angular/router';
import { QuicksaleComponent } from './quick-sale.component';
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
