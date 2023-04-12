import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { LoginModuleComponent } from './root/login-module.component';
import { LoginModuleRoutingModule } from './login-module-routing.module';

@NgModule({
  declarations: [LoginModuleComponent, RegisterComponent],
  imports: [CommonModule, LoginModuleRoutingModule, ReactiveFormsModule],
})
export class LoginModuleModule {}
