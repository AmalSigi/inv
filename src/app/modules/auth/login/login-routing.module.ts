import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModuleComponent } from './root/login.component';
import { RegisterComponent } from '../register/register.component';

const routes: Routes = [
  { path: '', component: LoginModuleComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginModuleRoutingModule {}
