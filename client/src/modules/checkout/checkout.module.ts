import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VenzraCommonModule } from '../../common/common.module';
import { CheckoutRoutingModule } from './routing.module';

import { CheckoutLayoutComponent } from './layout/checkout.layout';

import { BasketComponent } from './components/basket/basket.component';
import { PaymentComponent } from './components/payment/payment.component';

import { CalendarService } from '../../services/calendar.service';

@NgModule({
    declarations: [
        CheckoutLayoutComponent,
        BasketComponent,
        PaymentComponent
    ],
    imports: [
        CommonModule,
        VenzraCommonModule,
        CheckoutRoutingModule
    ],
    providers: [
        CalendarService
    ]
})
export class CheckoutModule {
}
