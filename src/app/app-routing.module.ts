import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActiveGuard } from './Active/active.guard';
import { DashboardGuard } from './Active/dashboard.guard';
import { SampleProductsComponent } from './sample-products/sample-products.component';


const routes: Routes = [
  {path:'',component:HomeComponent },
  {path:'home',component:HomeComponent },
   { path:'login', component:LoginComponent, canActivate:[ActiveGuard] },  
   { path:'dashboard', component:DashboardComponent, canActivate:[DashboardGuard]  },
   { path:'register', component:RegisterComponent },
   { path:'product/:productId', component:SampleProductsComponent },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
