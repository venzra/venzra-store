import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VenzraCommonModule } from '../../common/common.module';
import { AuthenticationComponent } from './components/authentication/authentication.component';

import { ProfileComponent } from './components/profile/profile.component';
import { AccountRoutingModule } from './routing.module';

@NgModule({
    declarations: [
        ProfileComponent,
        AuthenticationComponent
    ],
    imports: [
        CommonModule,
        VenzraCommonModule,
        AccountRoutingModule
    ]
})
export class AccountModule {
}
