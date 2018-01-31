import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VenzraCommonModule } from '../../common/common.module';
import { ShopFrontRoutingModule } from './routing.module';

import { StoreLayoutComponent } from './layout/store.layout';

import { LandingComponent } from './components/landing/landing.component';

@NgModule({
    declarations: [
        StoreLayoutComponent,
        LandingComponent
    ],
    imports: [
        CommonModule,
        VenzraCommonModule,
        ShopFrontRoutingModule
    ]
})
export class ShopFrontModule {
}
