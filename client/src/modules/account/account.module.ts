import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './routing.module';
import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraFiltersModule } from '@venzra/filters/filters.module';
import { VenzraContentModule } from '@venzra/components/content/content.module';

import { AuthenticationComponent } from './fragments/authentication/authentication.component';
import { PasswordComponent } from './fragments/password/password.component';
import { PasswordConfirmationComponent } from './fragments/password/confirmation/confirmation.component';
import { ProfileComponent } from './fragments/profile/profile.component';
import { OrdersComponent } from './fragments/orders/orders.component';

import { AddressModule } from '@venzra/components/addresses/address.module';

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
        AddressModule,
        AccountRoutingModule
    ]
})
export class AccountModule {
}
