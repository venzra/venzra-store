import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreRoutingModule } from './routing.module';
import { VenzraCommonModule } from './common/common.module';

import { SubscriptionRetrieveResolve, SubscriptionService } from './services/subscription.service';
import { AccountService } from './services/account.service';
import { CartService } from './services/cart.service';
import { ProductListResolve, ProductService } from './services/product.service';
import { PaymentService } from './services/payment.service';
import { OrderService } from './services/order.service';

import { AuthGuard } from './services/guard.service';
import { LayoutService } from './services/layout.service';

import { PublicComponent } from './public.component';
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
        SubscriptionService,
        SubscriptionRetrieveResolve,
        AccountService,
        ProductService,
        ProductListResolve,
        CartService,
        PaymentService,
        OrderService
    ],
    bootstrap: [StoreComponent]
})
export class StoreModule {
}
