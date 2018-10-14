import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/layout/content/content.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';
import { VenzraImageModule } from '@venzra/components';
import { AddressModule } from '@venzra/components/layout/addresses/address.module';

import { AuthenticationComponent } from './fragments/authentication/authentication.component';
import { PasswordComponent } from './fragments/password/password.component';
import { PasswordConfirmationComponent } from './fragments/password/confirmation/confirmation.component';
import { ProfileComponent } from './fragments/profile/profile.component';
import { OrdersComponent } from './fragments/orders/orders.component';

import { AccountRoutingModule } from './routing.module';

@NgModule({
    declarations: [
        AuthenticationComponent,
        PasswordComponent,
        PasswordConfirmationComponent,
        ProfileComponent,
        OrdersComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialDesignModule,
        VenzraContentModule,
        VenzraFiltersModule,
        VenzraImageModule,
        AddressModule,
        AccountRoutingModule
    ]
})
export class AccountModule {
}
