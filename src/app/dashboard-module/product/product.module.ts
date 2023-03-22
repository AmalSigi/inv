import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from 'src/app/add-product/add-product.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

// import { NavigationComponent } from '../navigation/na

@NgModule({
  declarations: [ProductComponent, AddProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class ProductModule {}
