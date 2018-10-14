import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraAccountModule } from '@venzra/components/layout/account/account.module';
import { VenzraCartModule } from '@venzra/components/layout/cart/cart.module';
import { VenzraImageModule } from '@venzra/components/layout/image/image.module';
import { VenzraSearchModule } from '@venzra/components/layout/search/search.module';

import { HeaderComponent } from '@venzra/components/layout/header/header.component';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        VenzraAccountModule,
        VenzraCartModule,
        VenzraImageModule,
        VenzraSearchModule,
        MaterialDesignModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class VenzraHeaderModule {
}
