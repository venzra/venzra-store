import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/layout/content/content.module';
import { VenzraProductModule } from '@venzra/components/layout/product/product.module';
import { VenzraImageModule } from '@venzra/components';

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
        VenzraImageModule,
        ShopFrontRoutingModule
    ]
})
export class ShopFrontModule {
}
