import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@venzra/services/guard.service';
import { AccountLogoutResolve } from '@venzra/services/account.service';

import { AuthenticationComponent } from './fragments/authentication/authentication.component';
import { PasswordComponent } from './fragments/password/password.component';
import { PasswordConfirmationComponent } from './fragments/password/confirmation/confirmation.component';
import { ProfileComponent } from './fragments/profile/profile.component';
import { OrdersComponent } from './fragments/orders/orders.component';

import { OrderListResolve, OrderService } from './services/order.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile',
        canActivate: [AuthGuard]
    },
    {
        path: 'authenticate',
        component: AuthenticationComponent
    },
    {
        path: 'password',
        component: PasswordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'password/confirmation',
        component: PasswordConfirmationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        resolve: {
            orders: OrderListResolve
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'orders',
        component: OrdersComponent,
        resolve: {
            orders: OrderListResolve
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'logout',
        resolve: {
            logout: AccountLogoutResolve
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
        OrderService,
        OrderListResolve
    ]
})
export class AccountRoutingModule {
}
