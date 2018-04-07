import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './routing.module';

import { VenzraCommonModule } from '../../common/common.module';

import { ContactComponent } from './contact/contact.component';

@NgModule({
    declarations: [
        ContactComponent
    ],
    imports: [
        CommonModule,
        VenzraCommonModule,
        ContactRoutingModule
    ]
})
export class ContactModule {
}
