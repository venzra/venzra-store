import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialDesignModule } from '@venzra/material.module';

import { SearchComponent } from './search.component';

@NgModule({
    declarations: [
        SearchComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialDesignModule
    ],
    exports: [
        SearchComponent
    ]
})
export class VenzraSearchModule {
}
