import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { VenzraCommonModule } from './common/common.module';
import { StoreRoutingModule } from './routing.module';

import { PricePipe } from './filters/price.pipe';

import { StoreComponent } from './store.component';
import { HeaderComponent } from './common/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopFrontComponent } from './components/shop-front/shop-front.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { FooterComponent } from './common/footer/footer.component';

import { LayoutService } from './layout.service';
import { SubscriptionRetrieveResolve, SubscriptionService } from './services/subscription.service';
import { ProductPromotionsResolve, ProductService } from './services/product.service';

@NgModule({
    declarations: [
        PricePipe,
        HeaderComponent,
        CartComponent,
        StoreComponent,
        ShopFrontComponent,
        PromotionsComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        VenzraCommonModule,
        StoreRoutingModule
    ],
    providers: [
        LayoutService,
        ProductService,
        SubscriptionService,
        ProductPromotionsResolve,
        SubscriptionRetrieveResolve
    ],
    bootstrap: [StoreComponent]
})
export class StoreModule {
}
