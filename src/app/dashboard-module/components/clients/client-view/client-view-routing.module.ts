import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientViewComponent } from './client-view.component';
import { ActiveGuard } from 'src/app/core/Active/active.guard';

const routes: Routes = [
  { path: '', component: ClientViewComponent, canActivate: [ActiveGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientViewRoutingModule {}
