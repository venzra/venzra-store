import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../services/guard.service';

import { AuthLayoutComponent } from './layout/auth.layout';
import { AccountLayoutComponent } from './layout/account.layout';

import { AuthenticationComponent } from './fragments/authentication/authentication.component';
import { ProfileComponent } from './fragments/profile/profile.component';
import { OrdersComponent } from './fragments/orders/orders.component';
import { LogoutComponent } from './fragments/logout/logout.component';

import { OrderListResolve, OrderService } from './services/order.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'authenticate',
                component: AuthenticationComponent
            }
        ]
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: '',
        component: AccountLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'orders',
                component: OrdersComponent,
                resolve: {
                    orders: OrderListResolve
                }
            }
        ]
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
        OrderService,
        OrderListResolve
    ]
})
export class AccountRoutingModule {
}
