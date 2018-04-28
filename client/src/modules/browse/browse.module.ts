import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/content/content.module';
import { VenzraProductModule } from '@venzra/components/product/product.module';
import { VenzraDirectivesModule } from '@venzra/directives/directives.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';

import { AccountRoutingModule } from './routing.module';

import { CatalogueComponent } from './fragments/catalogue/catalogue.component';
import { CategoryComponent } from './fragments/category/category.component';
import { ProductComponent } from './fragments/product/product.component';
import { SearchComponent } from './fragments/search/search.component';

@NgModule({
    declarations: [
        CatalogueComponent,
        CategoryComponent,
        ProductComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        MaterialDesignModule,
        VenzraContentModule,
        VenzraDirectivesModule,
        VenzraFiltersModule,
        VenzraProductModule,
        AccountRoutingModule
    ]
})
export class BrowseModule {
}
