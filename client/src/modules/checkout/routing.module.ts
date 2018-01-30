import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CheckoutLayout } from './layout/checkout.layout';
import { AuthGuard } from '../../services/guard.service';

import { BasketComponent } from './components/basket/basket.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'basket',
        pathMatch: 'full'
    },
    {
        path: '',
        component: CheckoutLayout,
        children: [
            {
                path: 'basket',
                component: BasketComponent
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
    ]
})
export class CheckoutRoutingModule {
}
