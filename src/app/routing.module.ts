import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartService,  CategoryListResolve, CategoryService, SubscriptionRetrieveResolve, SubscriptionService } from '@venzra/services';

import { StoreComponent } from '@venzra/components/layout/store.component';

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
                loadChildren: './components/pages/shop-front/shop-front.module#ShopFrontModule',
                pathMatch: 'full'
            },
            {
                path: 'about',
                loadChildren: './components/pages/about/about.module#AboutModule'
            },
            {
                path: 'account',
                loadChildren: './components/pages/account/account.module#AccountModule'
            },
            {
                path: 'browse',
                loadChildren: './components/pages/browse/browse.module#BrowseModule'
            },
            {
                path: 'careers',
                loadChildren: './components/pages/careers/careers.module#CareersModule'
            },
            {
                path: 'checkout',
                loadChildren: './components/pages/checkout/checkout.module#CheckoutModule'
            },
            {
                path: 'contact',
                loadChildren: './components/pages/contact/contact.module#ContactModule'
            },
            {
                path: 'locations',
                loadChildren: './components/pages/locations/locations.module#LocationsModule'
            },
            {
                path: 'products',
                loadChildren: './components/pages/products/product.module#ProductModule'
            },
            {
                path: 'terms',
                loadChildren: './components/pages/terms/terms.module#TermsModule'
            },
            {
                path: 'errors',
                loadChildren: './components/pages/errors/errors.module#ErrorsModule'
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
        CartService,
        SubscriptionService,
        SubscriptionRetrieveResolve,
        CategoryService,
        CategoryListResolve
    ]
})
export class VenzraRoutingModule {
}
