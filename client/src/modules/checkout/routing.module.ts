import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@venzra/services/guard.service';

import { BasketComponent } from './fragments/basket/basket.component';
import { PaymentComponent } from './fragments/payment/payment.component';

import { PaymentService } from './services/payment.service';
import { ShippingListResolve, ShippingService } from './services/shipping';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'basket',
        pathMatch: 'full'
    },
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
        PaymentService,
        ShippingService,
        ShippingListResolve
    ]
})
export class CheckoutRoutingModule {
}
