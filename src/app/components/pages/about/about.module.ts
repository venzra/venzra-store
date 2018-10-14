import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/layout/content/content.module';
import { VenzraDirectivesModule } from '@venzra/directives/directives.module';

import { AboutComponent } from './fragments/about/about.component';

import { AboutRoutingModule } from './routing.modules';

@NgModule({
    declarations: [
        AboutComponent
    ],
    imports: [
        CommonModule,
        MaterialDesignModule,
        VenzraContentModule,
        VenzraDirectivesModule,
        AboutRoutingModule
    ]
})
export class AboutModule {
}
