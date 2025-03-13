import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedUserGuard } from './core/guards/auth/logged-user.guard';

export const routes: Routes = [
  {path:"auth", component: AuthLayoutComponent, children: [
    {path: "", canActivate:[loggedUserGuard] ,loadComponent: () => import('./core/pages/register/register.component').then(c => c.RegisterComponent)},
    {path: "login",canActivate:[loggedUserGuard] , loadComponent: () => import('./core/pages/login/login.component').then(c => c.LoginComponent)},
    {path: "forget-password",canActivate:[loggedUserGuard] , loadComponent: () => import('./core/pages/forget/forget.component').then(c => c.ForgetComponent)},
  ]},
  {path:"home", canActivate:[authGuard] ,loadComponent: () => import('./features/pages/home/home.component').then(c => c.HomeComponent)},
  {path:"brands",canActivate:[authGuard] ,loadComponent: () => import('./features/pages/brands/brands.component').then(c => c.BrandsComponent)},
  {path:"products",canActivate:[authGuard] ,loadComponent: () => import('./features/pages/products/products.component').then(c => c.ProductsComponent)},
  {path:"categories",canActivate:[authGuard] ,loadComponent: () => import('./features/pages/categories/categories.component').then(c => c.CategoriesComponent)},
  {path:"cart",canActivate:[authGuard] ,loadComponent: () => import('./features/pages/cart/cart.component').then(c => c.CartComponent)},
  {path:"checkout/:cartId",canActivate:[authGuard] ,loadComponent: () => import('./features/pages/checkout/checkout.component').then(c => c.CheckoutComponent)},
  {path:"productDetails/:id",canActivate:[authGuard] ,loadComponent: () => import('./features/pages/product-details/product-details.component').then(c => c.ProductDetailsComponent)},
  {path:"**",canActivate:[authGuard] ,loadComponent: () => import('./core/pages/not-found/not-found.component').then(c => c.NotFoundComponent)},
];
