import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModuleComponent } from './root/login.component';
import { LoginModuleRoutingModule } from './login-routing.module';
import { RegisterComponent } from '../register/register.component';

@NgModule({
  declarations: [LoginModuleComponent, RegisterComponent],
  imports: [CommonModule, LoginModuleRoutingModule, ReactiveFormsModule],
})
export class LoginModuleModule {}
