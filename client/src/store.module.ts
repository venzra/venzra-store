import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { VenzraCommonModule } from './common/common.module';
import { StoreRoutingModule } from './routing.module';

import { StoreComponent } from './store.component';
import { HeaderComponent } from './common/header/header.component';
import { ShopFrontComponent } from './components/shop-front/shop-front.component';
import { FooterComponent } from './common/footer/footer.component';

import { LayoutService } from './layout.service';
import { SubscriptionRetrieveResolve, SubscriptionService } from './services/subscription.service';

@NgModule({
    declarations: [
        HeaderComponent,
        StoreComponent,
        ShopFrontComponent,
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
        SubscriptionService,
        SubscriptionRetrieveResolve
    ],
    bootstrap: [StoreComponent]
})
export class StoreModule {
}
