import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraDirectivesModule } from '@venzra/directives/directives.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';

import { ProductComponent } from './product.component';

@NgModule({
    declarations: [
        ProductComponent
    ],
    imports: [
        CommonModule,
        MaterialDesignModule,
        VenzraDirectivesModule,
        VenzraFiltersModule
    ],
    exports: [
        ProductComponent
    ]
})
export class VenzraProductModule {
}
