import { NgModule } from '@angular/core';
import { PreloadAllModules } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { ActiveGuard } from './core/Active/active.guard';
import { HomeComponent } from './modules/auth/home/home.component';
// import { SampleProductsComponent } from './modules/sample-products/sample-products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'product/:productId', component: SampleProductsComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/login/login.module').then(
        (m) => m.LoginModuleModule
      ),
    canActivate: [ActiveGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard-module.module').then(
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
