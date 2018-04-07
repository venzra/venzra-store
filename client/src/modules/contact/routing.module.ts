import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './contact/contact.component';
import { SubscriptionRetrieveResolve, SubscriptionService } from './services/subscription.service';

const routes: Routes = [
    {
        path: '',
        component: ContactComponent,
        resolve: {
            subscription: SubscriptionRetrieveResolve
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
        SubscriptionService,
        SubscriptionRetrieveResolve
    ]
})
export class ContactRoutingModule {
}
