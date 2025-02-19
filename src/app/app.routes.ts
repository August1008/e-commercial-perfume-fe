import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ShopComponent } from './features/shop/shop.component';
import { ProductDetailComponent } from './features/shop/product-detail/product-detail.component';
import { TestErrorComponent } from './features/test-error/test-error.component';

export const routes: Routes = [
    { path: "", component: ShopComponent },
    { path: "shop", component: ShopComponent },
    { path: "shop/:id", component: ProductDetailComponent },
    { path: "test-error", component: TestErrorComponent },
    { path: "**", redirectTo: "", pathMatch: "full" }
];
