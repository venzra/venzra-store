import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountService } from '@venzra/services/account.service';
import { CartService } from '@venzra/services/cart.service';
import { SubscriptionRetrieveResolve, SubscriptionService } from '@venzra/services/subscription.service';

import { StoreComponent } from '@venzra/layout/store.component';

const routes: Routes = [
    {
        path: '',
        component: StoreComponent,
        resolve: {
            subscription: SubscriptionRetrieveResolve
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
                path: 'checkout',
                loadChildren: './modules/checkout/checkout.module#CheckoutModule'
            },
            {
                path: 'contact',
                loadChildren: './modules/contact/contact.module#ContactModule'
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
        SubscriptionRetrieveResolve
    ]
})
export class VenzraRoutingModule {
}
