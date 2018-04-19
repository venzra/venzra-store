import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentGuard } from './services/content-guard.service';

import { ContentRetrieveResolve, ContentService } from './services/content.service';
import { SubscriptionRetrieveResolve, SubscriptionService } from './services/subscription.service';

import { ContactComponent } from './fragments/contact/contact.component';
import { ConfirmationComponent } from './fragments/confirmation/confirmation.component';

const routes: Routes = [
    {
        path: '',
        component: ContactComponent,
        resolve: {
            subscription: SubscriptionRetrieveResolve,
            content: ContentRetrieveResolve
        },
        data: { feature: 'CONTACT' },
        canActivate: [ContentGuard]
    },
    {
        path: 'confirmation',
        component: ConfirmationComponent,
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
        ContentService,
        ContentRetrieveResolve,
        SubscriptionService,
        SubscriptionRetrieveResolve,
        ContentGuard
    ]
})
export class ContactRoutingModule {
}
