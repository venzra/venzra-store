import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VenzraCommonModule } from './common/common.module';
import { StoreRoutingModule } from './routing.module';

import { StoreComponent } from './store.component';

import { PublicComponent } from './public.component';

import { LayoutService } from './services/layout.service';
import { ProductPromotionsResolve, ProductService } from './services/product.service';
import { CartService, CartEventEmitter, CartEventService } from './services/cart.service';

@NgModule({
    declarations: [
        PublicComponent,
        StoreComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        VenzraCommonModule,
        StoreRoutingModule
    ],
    exports: [
        BrowserAnimationsModule
    ],
    providers: [
        LayoutService,
        ProductService,
        ProductPromotionsResolve,
        CartService,
        CartEventEmitter,
        CartEventService
    ],
    bootstrap: [StoreComponent]
})
export class StoreModule {
}
