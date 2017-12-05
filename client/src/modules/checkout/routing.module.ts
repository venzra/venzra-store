import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../services/guard.service';
import { SubscriptionRetrieveResolve } from '../../services/subscription.service';
import { ProductPromotionsResolve } from '../../services/product.service';

import { BasketComponent } from './components/basket/basket.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
    {
        path: 'basket',
        component: BasketComponent,
        resolve: {
            products: ProductPromotionsResolve
        }
    },
    {
        path: 'payment',
        component: PaymentComponent,
        resolve: {
            subscription: SubscriptionRetrieveResolve
        },
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'basket',
        pathMatch: 'full'
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
export class CheckoutRoutingModule {
}
