import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from '../../pages/clients/client.component';
import { ActiveGuard } from 'src/app/core/Active/active.guard';

const routes: Routes = [
  { path: '', component: ClientComponent },
  {
    path: 'clientView/:id',
    loadChildren: () =>
      import('./client-view/client-view.module').then(
        (m) => m.ClientViewModule
      ),
    canActivate: [ActiveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
