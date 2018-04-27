import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';

import { AlignedComponent } from './aligned-content/aligned.component';
import { CenteredComponent } from './centered-content/centered.component';
import { PageTitleComponent } from './page-title/page-title.component';

@NgModule({
    declarations: [
        AlignedComponent,
        CenteredComponent,
        PageTitleComponent
    ],
    imports: [
        CommonModule,
        MaterialDesignModule,
        VenzraFiltersModule
    ],
    exports: [
        AlignedComponent,
        CenteredComponent,
        PageTitleComponent
    ]
})
export class VenzraContentModule {
}
