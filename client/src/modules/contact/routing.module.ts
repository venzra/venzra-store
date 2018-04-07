import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentGuard } from './services/content-guard.service';

import { ContactComponent } from './contact/contact.component';
import { SubscriptionRetrieveResolve, SubscriptionService } from './services/subscription.service';

const routes: Routes = [
    {
        path: '',
        component: ContactComponent,
        resolve: {
            subscription: SubscriptionRetrieveResolve
        },
        data: { feature: 'CONTACT' },
        canActivate: [ContentGuard]
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
        SubscriptionService,
        SubscriptionRetrieveResolve,
        ContentGuard
    ]
})
export class ContactRoutingModule {
}
