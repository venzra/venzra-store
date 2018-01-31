import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VenzraCommonModule } from '../../common/common.module';
import { AccountRoutingModule } from './routing.module';

import { AuthLayoutComponent } from './layout/auth.layout';
import { AccountLayoutComponent } from './layout/account.layout';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderListResolve } from '../../services/order.service';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
    declarations: [
        AuthLayoutComponent,
        AccountLayoutComponent,
        AuthenticationComponent,
        ProfileComponent,
        OrdersComponent,
        LogoutComponent
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
