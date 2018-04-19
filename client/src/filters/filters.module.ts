import { NgModule } from '@angular/core';

import { PricePipe } from '@venzra/filters/price.pipe';

@NgModule({
    declarations: [
        PricePipe
    ],
    exports: [
        PricePipe
    ]
})
export class VenzraFiltersModule {
}
