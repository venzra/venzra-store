import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationPageResolve, ContentService } from './services/content.service';
import { CareerListResolve, CareerService } from './services/career.service';

import { CareersComponent } from './fragments/careers/careers.component';

const routes: Routes = [
    {
        path: '',
        component: CareersComponent,
        resolve: {
            content: LocationPageResolve,
            careerData: CareerListResolve
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
        CareerService,
        LocationPageResolve,
        CareerListResolve
    ]
})
export class CareersRoutingModule {
}
