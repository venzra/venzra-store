import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenzraCommonModule } from '../../common/common.module';
import { AccountRoutingModule } from './routing.module';

import { BrowseLayoutComponent } from './layout/browse.layout';

import { ProductComponent } from './fragments/product/product.component';

@NgModule({
    declarations: [
        BrowseLayoutComponent,
        ProductComponent
    ],
    imports: [
        CommonModule,
        VenzraCommonModule,
        AccountRoutingModule
    ]
})
export class BrowseModule {
}
