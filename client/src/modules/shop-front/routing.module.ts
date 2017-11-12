import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';

import { SubscriptionRetrieveResolve } from '../../services/subscription.service';
import { ProductPromotionsResolve } from '../../services/product.service';

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
