import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VenzraCommonModule } from '../../common/common.module';

import { BasketComponent } from './components/basket/basket.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CheckoutRoutingModule } from './routing.module';

@NgModule({
    declarations: [
        BasketComponent,
        PaymentComponent
    ],
    imports: [
        CommonModule,
        VenzraCommonModule,
        CheckoutRoutingModule
    ]
})
export class CheckoutModule {
}
