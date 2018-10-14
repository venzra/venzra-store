import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/layout/content/content.module';
import { VenzraDirectivesModule } from '@venzra/directives/directives.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';
import { VenzraImageModule } from '@venzra/components';

import { LocationComponent } from './fragments/location/location.component';

import { LocationRoutingModule } from './routing.modules';

@NgModule({
    declarations: [
        LocationComponent
    ],
    imports: [
        CommonModule,
        MaterialDesignModule,
        VenzraContentModule,
        VenzraDirectivesModule,
        VenzraFiltersModule,
        VenzraImageModule,
        LocationRoutingModule
    ]
})
export class LocationsModule {
}
