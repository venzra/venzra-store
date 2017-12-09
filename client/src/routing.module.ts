import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';

import { SubscriptionRetrieveResolve } from './services/subscription.service';

const routes: Routes = [
    {
        path: '',
        component: PublicComponent,
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
                path: 'browse',
                loadChildren: './modules/browse/browse.module#BrowseModule'
            },
            {
                path: 'account',
                loadChildren: './modules/account/account.module#AccountModule'
            },
            {
                path: 'checkout',
                loadChildren: './modules/checkout/checkout.module#CheckoutModule'
            },
            {
                path: '**',
                redirectTo: '/errors/404'
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
    ]
})
export class StoreRoutingModule {
}
