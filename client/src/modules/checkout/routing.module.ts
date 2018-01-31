import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CheckoutLayoutComponent } from './layout/checkout.layout';
import { AuthGuard } from '../../services/guard.service';

import { BasketComponent } from './components/basket/basket.component';
import { PaymentComponent } from './components/payment/payment.component';

import { ShippingListResolve, ShippingService } from './services/shipping';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'basket',
        pathMatch: 'full'
    },
    {
        path: '',
        component: CheckoutLayoutComponent,
        children: [
            {
                path: 'basket',
                component: BasketComponent,
                resolve: {
                    shippingData: ShippingListResolve
                }
            },
            {
                path: 'payment',
                component: PaymentComponent,
                canActivate: [AuthGuard]
            }]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ShippingService,
        ShippingListResolve
    ]
})
export class CheckoutRoutingModule {
}
