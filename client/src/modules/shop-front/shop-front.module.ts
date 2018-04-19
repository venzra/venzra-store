import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/content/content.module';
import { VenzraProductModule } from '@venzra/components/product/product.module';

import { LandingComponent } from './fragments/landing/landing.component';

import { ShopFrontRoutingModule } from './routing.module';

@NgModule({
    declarations: [
        LandingComponent
    ],
    imports: [
        CommonModule,
        MaterialDesignModule,
        VenzraContentModule,
        VenzraProductModule,
        ShopFrontRoutingModule
    ]
})
export class ShopFrontModule {
}
