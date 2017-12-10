import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthLayout } from './layout/auth.layout';
import { AccountLayout } from './layout/account.layout';
import { AuthGuard } from '../../services/guard.service';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LogoutComponent } from './components/logout/logout.component';

import { OrderListResolve } from '../../services/order.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile',
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: AuthLayout,
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
        component: AccountLayout,
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
    ]
})
export class AccountRoutingModule {
}
