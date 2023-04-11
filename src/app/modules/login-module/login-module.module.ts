import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginModuleRoutingModule } from './login-module-routing.module';
import { LoginModuleComponent } from './root/login-module.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';

@NgModule({
  declarations: [LoginModuleComponent, RegisterComponent],
  imports: [CommonModule, LoginModuleRoutingModule, ReactiveFormsModule],
})
export class LoginModuleModule {}
