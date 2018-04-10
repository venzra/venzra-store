import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './routing.module';

import { VenzraCommonModule } from '@venzra/common/common.module';

import { ContactComponent } from './contact/contact.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
    declarations: [
        ContactComponent,
        ConfirmationComponent
    ],
    imports: [
        CommonModule,
        VenzraCommonModule,
        ContactRoutingModule
    ]
})
export class ContactModule {
}
