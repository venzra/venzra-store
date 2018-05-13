import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountService } from '@venzra/services/account.service';
import { CartService } from '@venzra/services/cart.service';
import { CategoryListResolve, CategoryService } from '@venzra/services/category.service';
import { SubscriptionRetrieveResolve, SubscriptionService } from '@venzra/services/subscription.service';

import { StoreComponent } from '@venzra/layout/store.component';

const routes: Routes = [
    {
        path: '',
        component: StoreComponent,
        resolve: {
            subscription: SubscriptionRetrieveResolve,
            categories: CategoryListResolve
        },
        children: [
            {
                path: '',
                loadChildren: './modules/shop-front/shop-front.module#ShopFrontModule',
                pathMatch: 'full'
            },
            {
                path: 'about',
                loadChildren: './modules/about/about.module#AboutModule'
            },
            {
                path: 'account',
                loadChildren: './modules/account/account.module#AccountModule'
            },
            {
                path: 'browse',
                loadChildren: './modules/browse/browse.module#BrowseModule'
            },
            {
                path: 'careers',
                loadChildren: './modules/careers/careers.module#CareersModule'
            },
            {
                path: 'checkout',
                loadChildren: './modules/checkout/checkout.module#CheckoutModule'
            },
            {
                path: 'contact',
                loadChildren: './modules/contact/contact.module#ContactModule'
            },
            {
                path: 'locations',
                loadChildren: './modules/locations/locations.module#LocationsModule'
            },
            {
                path: 'products',
                loadChildren: './modules/products/product.module#ProductModule'
            },
            {
                path: 'terms',
                loadChildren: './modules/terms/terms.module#TermsModule'
            },
            {
                path: 'errors',
                loadChildren: './modules/errors/errors.module#ErrorsModule'
            },
            {
                path: '**',
                redirectTo: '/errors/not-found'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AccountService,
        CartService,
        SubscriptionService,
        SubscriptionRetrieveResolve,
        CategoryService,
        CategoryListResolve
    ]
})
export class VenzraRoutingModule {
}
