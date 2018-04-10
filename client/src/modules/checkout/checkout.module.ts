import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VenzraCommonModule } from '@venzra/common/common.module';
import { CheckoutRoutingModule } from './routing.module';

import { CheckoutLayoutComponent } from './layout/checkout.layout';

import { BasketComponent } from './fragments/basket/basket.component';
import { PaymentComponent } from './fragments/payment/payment.component';

import { CalendarService } from './services/calendar.service';

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
