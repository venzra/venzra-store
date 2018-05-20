import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CheckoutRoutingModule } from './routing.module';
import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/content/content.module';
import { VenzraDirectivesModule } from '@venzra/directives/directives.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';

import { BasketComponent } from './fragments/basket/basket.component';
import { PaymentComponent } from './fragments/payment/payment.component';
import { PaymentAddressDialogComponent } from './fragments/payment/address/address.component';

import { CalendarService } from './services/calendar.service';

@NgModule({
    declarations: [
        BasketComponent,
        PaymentComponent,
        PaymentAddressDialogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialDesignModule,
        VenzraContentModule,
        VenzraDirectivesModule,
        VenzraFiltersModule,
        CheckoutRoutingModule
    ],
    providers: [
        CalendarService
    ],
    entryComponents: [
        PaymentAddressDialogComponent
    ]
})
export class CheckoutModule {
}
