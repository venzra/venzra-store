import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@venzra/services/guard.service';

import { PaymentService } from './services/payment.service';
import { ShippingListResolve, ShippingService } from './services/shipping';

import { BasketComponent } from './fragments/basket/basket.component';
import { PaymentComponent } from './fragments/payment/payment.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'basket',
        pathMatch: 'full'
    },
    {
        path: 'basket',
        component: BasketComponent
    },
    {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [AuthGuard],
        resolve: {
            shippingData: ShippingListResolve
        }
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
