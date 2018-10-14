import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraDirectivesModule } from '@venzra/directives/directives.module';
import { VenzraContentModule } from '@venzra/components/layout/content/content.module';

import { TermsComponent } from './fragments/terms/terms.component';

import { TermsRoutingModule } from './routing.modules';

@NgModule({
    declarations: [
        TermsComponent
    ],
    imports: [
        CommonModule,
        MaterialDesignModule,
        VenzraContentModule,
        VenzraDirectivesModule,
        TermsRoutingModule
    ]
})
export class TermsModule {
}
