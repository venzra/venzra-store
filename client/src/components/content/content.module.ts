import { NgModule } from '@angular/core';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';

import { CenteredComponent } from './centered-content/centered.component';
import { PageTitleComponent } from './page-title/page-title.component';

@NgModule({
    declarations: [
        CenteredComponent,
        PageTitleComponent
    ],
    imports: [
        MaterialDesignModule,
        VenzraFiltersModule
    ],
    exports: [
        CenteredComponent,
        PageTitleComponent
    ]
})
export class VenzraContentModule {
}
