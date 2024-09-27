import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdpComponent } from './components/pdp/pdp.component';
import { HomeComponent } from './components/home/home.component';
import { PlpComponent } from './components/plp/plp.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AccountComponent } from './components/account/account.component';
import { OrderHistoryComponent } from './components/account/order-history/order-history.component';
import { WishlistComponent } from './components/account/wishlist/wishlist.component';
import { AccountDetailsComponent } from './components/account/account-details/account-details.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent },
    { path: 'home/product/:productUrlKey', component: PdpComponent, data: { breadcrumb: 'Product' } },
    { path: 'product/:productUrlKey', component: PdpComponent, data: { breadcrumb: 'Product' } },
    {
        path: 'catalog', component: PlpComponent, data: { breadcrumb: 'Catalog' },
        children: [
            { path: 'category', component: PlpComponent, data: { breadcrumb: (route: any) => route.queryParams['category'] } }],
    },
    { path: 'catalog/product/:productUrlKey', component: PdpComponent, data: { breadcrumb: (route: any) => route.queryParams['id'] } },
    { path: 'catalog/category/product/:productUrlKey', component: PdpComponent, data: { breadcrumb: (route: any) => route.queryParams['id'] } },
    {
        path: 'cart', component: CartComponent,
        children: [
            { path: 'cart/checkout', component: CheckoutComponent }
        ]
    },
    { path: 'checkout', component: CheckoutComponent },
    {
        path: 'account', component: AccountComponent,
        canActivate:[authGuard],
        children: [
            { path: 'details', component: AccountDetailsComponent },
            { path: 'orders', component: OrderHistoryComponent },
            { path: 'wishlist', component: WishlistComponent },
            { path: '', redirectTo: 'details', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }