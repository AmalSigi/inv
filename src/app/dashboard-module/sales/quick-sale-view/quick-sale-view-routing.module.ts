import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickSaleViewComponent } from './quick-sale-view.component';

const routes: Routes = [{ path: '', component: QuickSaleViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickSaleViewRoutingModule { }
