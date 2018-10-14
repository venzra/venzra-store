import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationPageResolve, ContentService } from './services/content.service';
import { LocationListResolve, LocationService } from './services/location.service';

import { LocationComponent } from './fragments/location/location.component';

const routes: Routes = [
    {
        path: '',
        component: LocationComponent,
        resolve: {
            content: LocationPageResolve,
            locationData: LocationListResolve
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ContentService,
        LocationService,
        LocationPageResolve,
        LocationListResolve
    ]
})
export class LocationRoutingModule {
}
