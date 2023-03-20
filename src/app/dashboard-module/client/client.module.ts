import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductRoutingModule } from '../product/product-routing.module';


@NgModule({
  declarations: [
    ClientComponent,
    AddClientComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule ,
    FormsModule,
    SharedModule
  ]
})
export class ClientModule { }
