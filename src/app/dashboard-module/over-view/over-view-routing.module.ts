import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverViewComponent } from './over-view.component';
import { ActiveGuard } from 'src/app/Active/active.guard';

const routes: Routes = [
  { path: '', component: OverViewComponent, canActivate: [ActiveGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverViewRoutingModule {}
