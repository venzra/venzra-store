import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenzraCommonModule } from '../../common/common.module';
import { AccountRoutingModule } from './routing.module';

import { ProductComponent } from './components/product/product.component';

import { ProductRetrieveResolve, ProductService } from '../../services/product.service';

@NgModule({
    declarations: [
        ProductComponent
    ],
    imports: [
        CommonModule,
        VenzraCommonModule,
        AccountRoutingModule
    ],
    providers: [
        ProductService,
        ProductRetrieveResolve
    ]
})
export class BrowseModule {
}
