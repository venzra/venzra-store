import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VenzraCommonModule } from '../../common/common.module';
import { AccountRoutingModule } from './routing.module';

import { AuthLayoutComponent } from './layout/auth.layout';
import { AccountLayoutComponent } from './layout/account.layout';

import { AuthenticationComponent } from './fragments/authentication/authentication.component';
import { ProfileComponent } from './fragments/profile/profile.component';
import { OrdersComponent } from './fragments/orders/orders.component';
import { LogoutComponent } from './fragments/logout/logout.component';

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
    ]
})
export class AccountModule {
}
