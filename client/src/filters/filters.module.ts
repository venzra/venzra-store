import { NgModule } from '@angular/core';

import { AddressPipe } from './address.pipe';
import { PricePipe } from './price.pipe';

@NgModule({
    declarations: [
        AddressPipe,
        PricePipe
    ],
    exports: [
        AddressPipe,
        PricePipe
    ]
})
export class VenzraFiltersModule {
}
