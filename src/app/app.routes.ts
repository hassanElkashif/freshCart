import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedUserGuard } from './core/guards/auth/logged-user.guard';

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "auth", component: AuthLayoutComponent, children: [
      { path: "", pathMatch: "full", redirectTo: "login" }, 
      { path: "login", canActivate: [loggedUserGuard], loadComponent: () => import('./core/pages/login/login.component').then(c => c.LoginComponent) },
      { path: "register", canActivate: [loggedUserGuard], loadComponent: () => import('./core/pages/register/register.component').then(c => c.RegisterComponent) },
      { path: "forget-password", canActivate: [loggedUserGuard], loadComponent: () => import('./core/pages/forget/forget.component').then(c => c.ForgetComponent) },
    ]
  },
  { path: "home", canActivate: [authGuard], loadComponent: () => import('./features/pages/home/home.component').then(c => c.HomeComponent) },
  { path: "brands", canActivate: [authGuard], loadComponent: () => import('./features/pages/brands/brands.component').then(c => c.BrandsComponent) },
  { path: "products", canActivate: [authGuard], loadComponent: () => import('./features/pages/products/products.component').then(c => c.ProductsComponent) },
  { path: "categories", canActivate: [authGuard], loadComponent: () => import('./features/pages/categories/categories.component').then(c => c.CategoriesComponent) },
  { path: "cart", canActivate: [authGuard], loadComponent: () => import('./features/pages/cart/cart.component').then(c => c.CartComponent) },
  { path: "whishList", canActivate: [authGuard], loadComponent: () => import('./features/pages/whish-list/whish-list.component').then(c => c.WishListComponent) },
  
  
  {
    path: "checkout/:cartId",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./features/pages/checkout/checkout.component").then(
        (c) => c.CheckoutComponent
      ),
    data: { renderMode: "server" } // Use SSR (not static prerendering)
  } , 
  
  { path: "productDetails/:id", canActivate: [authGuard], loadComponent: () => import('./features/pages/product-details/product-details.component').then(c => c.ProductDetailsComponent) },
  { path: "allorders", canActivate: [authGuard], loadComponent: () => import('./features/pages/orders/orders.component').then(c => c.OrdersComponent) },
  { path: "**", loadComponent: () => import('./core/pages/not-found/not-found.component').then(c => c.NotFoundComponent) }, 
];
