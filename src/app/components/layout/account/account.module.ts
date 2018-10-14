import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialDesignModule } from '@venzra/material.module';

import { AccountComponent } from './account.component';

@NgModule({
    declarations: [
        AccountComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialDesignModule
    ],
    exports: [
        AccountComponent
    ]
})
export class VenzraAccountModule {
}
