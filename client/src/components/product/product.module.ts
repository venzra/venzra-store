import { NgModule } from '@angular/core';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';

import { ProductComponent } from './product.component';

@NgModule({
    declarations: [
        ProductComponent
    ],
    imports: [
        MaterialDesignModule,
        VenzraFiltersModule
    ],
    exports: [
        ProductComponent
    ]
})
export class VenzraProductModule {
}
