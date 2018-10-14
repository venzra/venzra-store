import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraProductModule } from '@venzra/components/layout/product/product.module';
import { VenzraDirectivesModule } from '@venzra/directives/directives.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';
import { VenzraContentModule } from '@venzra/components/layout/content/content.module';
import { VenzraImageModule } from '@venzra/components';

import { CategoryComponent } from './fragments/category/category.component';
import { SearchComponent } from './fragments/search/search.component';

import { AccountRoutingModule } from './routing.module';

@NgModule({
    declarations: [
        CategoryComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        MaterialDesignModule,
        VenzraContentModule,
        VenzraProductModule,
        VenzraDirectivesModule,
        VenzraFiltersModule,
        VenzraImageModule,
        AccountRoutingModule
    ]
})
export class BrowseModule {
}
