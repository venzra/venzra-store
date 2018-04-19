import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TermsPageResolve, TermsService } from './services/terms.service';

import { TermsComponent } from './fragments/terms/terms.component';

const routes: Routes = [
    {
        path: '',
        component: TermsComponent,
        resolve: {
            terms: TermsPageResolve
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
        TermsService,
        TermsPageResolve
    ]
})
export class TermsRoutingModule {
}
