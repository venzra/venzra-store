import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/layout/content/content.module';
import { VenzraProductModule } from '@venzra/components/layout/product/product.module';
import { VenzraDirectivesModule } from '@venzra/directives/directives.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';
import { VenzraImageModule } from '@venzra/components';

import { ProductComponent } from './fragments/product/product.component';

import { ProductRoutingModule } from './routing.module';

@NgModule({
    declarations: [
        ProductComponent
    ],
    imports: [
        CommonModule,
        MaterialDesignModule,
        VenzraContentModule,
        VenzraProductModule,
        VenzraDirectivesModule,
        VenzraFiltersModule,
        VenzraImageModule,
        ProductRoutingModule
    ]
})
export class ProductModule {
}
