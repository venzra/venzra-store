import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/content/content.module';
import { VenzraDirectivesModule } from '@venzra/directives/directives.module';

import { TermsRoutingModule } from './routing.modules';

import { TermsComponent } from './fragments/terms/terms.component';

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
