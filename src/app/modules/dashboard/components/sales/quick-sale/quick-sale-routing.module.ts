import { NgModule } from '@angular/core';
import { ActiveGuard } from '@guards/active.guard';
import { RouterModule, Routes } from '@angular/router';
import { QuickSaleViewComponent } from '@sales/quick-sale/quick-sale-view/quick-sale-view.component';
import { QuicksaleComponent } from '@sales/quick-sale/quick-sale.component';

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
