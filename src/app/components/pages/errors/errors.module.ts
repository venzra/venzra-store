import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/layout/content/content.module';

import { ErrorsRoutingModule } from './routing.module';

import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        MaterialDesignModule,
        VenzraContentModule,
        ErrorsRoutingModule
    ]
})
export class ErrorsModule {
}
