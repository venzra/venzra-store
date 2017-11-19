import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ProductPromotionsResolve } from '../../services/product.service';

import { SubscriptionRetrieveResolve } from '../../services/subscription.service';

import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        resolve: {
            subscription: SubscriptionRetrieveResolve,
            products: ProductPromotionsResolve
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShopFrontRoutingModule {
}
