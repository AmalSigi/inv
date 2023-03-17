import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { PaginationPipe } from 'src/app/pagination.pipe';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddClientComponent } from './add-client/add-client.component';


@NgModule({
  declarations: [
    ClientComponent,
    PaginationPipe,
    AddClientComponent,


  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
