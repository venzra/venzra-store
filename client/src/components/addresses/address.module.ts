import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@venzra/material.module';

import { AddressCreateDialogComponent } from './create-dialog.component';
import { AddressRemoveDialogComponent } from './remove-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AddressCreateDialogComponent,
        AddressRemoveDialogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialDesignModule
    ],
    exports: [
        AddressCreateDialogComponent,
        AddressRemoveDialogComponent
    ],
    entryComponents: [
        AddressCreateDialogComponent,
        AddressRemoveDialogComponent
    ]
})
export class AddressModule {
}
