import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/content/content.module';

import { NotFoundComponent } from './not-found/not-found.component';

import { ErrorsRoutingModule } from './routing.module';

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
