import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';

import { CartComponent } from './cart.component';

@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        VenzraFiltersModule,
        MaterialDesignModule
    ],
    exports: [
        CartComponent
    ]
})
export class VenzraCartModule {
}
