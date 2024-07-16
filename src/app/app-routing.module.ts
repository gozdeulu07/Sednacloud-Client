import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent },
      { path: "hotels", loadChildren: () => import("./admin/components/hotels/hotels.module").then(module => module.HotelsModule) }
      // { path: "", component: DashboardComponent, canActivate: [authGuard] },
      // { path: "customers", loadChildren: () => import("./admin/components/customers/customers.module").then(module => module.CustomersModule), canActivate: [authGuard] },
      // ], canActivate: [authGuard]
    ]
  },
  { path: "", component: HomeComponent },
  { path: "login", loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule) },
  { path: "register", loadChildren: () => import("./ui/components/register/register.module").then(module => module.RegisterModule) },
  // { path: "products", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
