import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/layout/content/content.module';
import { VenzraDirectivesModule } from '@venzra/directives/directives.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';
import { VenzraImageModule } from '@venzra/components';
import { AddressModule } from '@venzra/components/layout/addresses/address.module';

import { CalendarService } from './services/calendar.service';

import { BasketComponent } from './fragments/basket/basket.component';
import { PaymentComponent } from './fragments/payment/payment.component';

import { CheckoutRoutingModule } from './routing.module';

@NgModule({
    declarations: [
        BasketComponent,
        PaymentComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialDesignModule,
        VenzraContentModule,
        VenzraDirectivesModule,
        VenzraFiltersModule,
        VenzraImageModule,
        AddressModule,
        CheckoutRoutingModule
    ],
    providers: [
        CalendarService
    ]
})
export class CheckoutModule {
}
