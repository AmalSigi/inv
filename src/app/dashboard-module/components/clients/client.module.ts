import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/core/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientComponent } from '../../pages/clients/client.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientRoutingModule } from './client-routing.module';
import { UpdateClientComponent } from './update-client/update-client.component';

@NgModule({
  declarations: [ClientComponent, AddClientComponent, UpdateClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class ClientModule {}
