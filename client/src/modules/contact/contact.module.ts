import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialDesignModule } from '@venzra/material.module';
import { VenzraContentModule } from '@venzra/components/content/content.module';
import { VenzraDirectivesModule } from '@venzra/directives/directives.module';

import { ContactComponent } from './fragments/contact/contact.component';
import { ConfirmationComponent } from './fragments/confirmation/confirmation.component';

import { ContactRoutingModule } from './routing.module';

@NgModule({
    declarations: [
        ContactComponent,
        ConfirmationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialDesignModule,
        VenzraContentModule,
        VenzraDirectivesModule,
        ContactRoutingModule
    ]
})
export class ContactModule {
}
