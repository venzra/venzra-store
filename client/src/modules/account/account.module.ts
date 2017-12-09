import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VenzraCommonModule } from '../../common/common.module';
import { AccountRoutingModule } from './routing.module';

import { AuthLayout } from './layout/auth.layout';
import { AccountLayout } from './layout/account.layout';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderListResolve } from '../../services/order.service';

@NgModule({
    declarations: [
        AuthLayout,
        AccountLayout,
        AuthenticationComponent,
        ProfileComponent,
        OrdersComponent
    ],
    imports: [
        CommonModule,
        VenzraCommonModule,
        AccountRoutingModule
    ],
    providers: [
        OrderListResolve
    ]
})
export class AccountModule {
}
