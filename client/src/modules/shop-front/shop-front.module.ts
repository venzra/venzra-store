import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VenzraCommonModule } from '../../common/common.module';

import { LandingComponent } from './components/landing/landing.component';
import { ShopFrontRoutingModule } from './routing.module';

@NgModule({
    declarations: [
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
