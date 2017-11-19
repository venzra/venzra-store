import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VenzraCommonModule } from './common/common.module';

import { PublicComponent } from './public.component';
import { StoreRoutingModule } from './routing.module';
import { AccountService } from './services/account.service';
import { CartService } from './services/cart.service';

import { AuthGuard } from './services/guard.service';
import { LayoutService } from './services/layout.service';
import { ProductPromotionsResolve, ProductService } from './services/product.service';

import { StoreComponent } from './store.component';

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
        AuthGuard,
        LayoutService,
        AccountService,
        ProductService,
        ProductPromotionsResolve,
        CartService
    ],
    bootstrap: [StoreComponent]
})
export class StoreModule {
}
