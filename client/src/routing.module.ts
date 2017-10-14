import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ShopFrontComponent } from './components/shop-front/shop-front.component';
import { SubscriptionRetrieveResolve } from './services/subscription.service';

const routes: Routes = [
    {
        path: '',
        component: ShopFrontComponent,
        pathMatch: 'full',
        resolve: {
            subscription: SubscriptionRetrieveResolve
        }
    },
    {
        path: '**',
        redirectTo: '/errors/404'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class StoreRoutingModule {
}
