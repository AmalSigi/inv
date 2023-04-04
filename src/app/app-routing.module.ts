import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { ActiveGuard } from './Active/active.guard';
import { PreloadAllModules } from '@angular/router';
import { DashboardGuard } from './Active/dashboard.guard';
import { HomeComponent } from './home/home.component';
import { SampleProductsComponent } from './sample-products/sample-products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product/:productId', component: SampleProductsComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./login-module/login-module.module').then(
        (m) => m.LoginModuleModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard-module/dashboard-module.module').then(
        (m) => m.DashboardModuleModule
      ),

    canActivate: [ActiveGuard],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
