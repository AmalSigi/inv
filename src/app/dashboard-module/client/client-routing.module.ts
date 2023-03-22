import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  {
    path: 'clientView/:id',
    loadChildren: () =>
      import('./client-view/client-view.module').then(
        (m) => m.ClientViewModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
