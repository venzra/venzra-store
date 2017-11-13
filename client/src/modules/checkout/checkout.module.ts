import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenzraCommonModule } from '../../common/common.module';
import { CheckoutRoutingModule } from './routing.module';

import { BasketComponent } from './components/basket/basket.component';

@NgModule({
    declarations: [
        BasketComponent
    ],
    imports: [
        CommonModule,
        VenzraCommonModule,
        CheckoutRoutingModule
    ]
})
export class CheckoutModule {
}
