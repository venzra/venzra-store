import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageResolve, AboutService } from './services/about.service';

import { AboutComponent } from './fragments/about/about.component';

const routes: Routes = [
    {
        path: '',
        component: AboutComponent,
        resolve: {
            about: AboutPageResolve
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
        AboutService,
        AboutPageResolve
    ]
})
export class AboutRoutingModule {
}
