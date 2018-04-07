import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from '../models/subscription';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

@Component({
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    providers: [ContactService]
})
export class ContactComponent implements OnInit {

    public subscription: Subscription;

    public contactForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private forms: FormBuilder,
        private contactService: ContactService
    ) { }

    ngOnInit(): void {
        this.subscription = this.route.snapshot.data.subscription;

        this.contactForm = this.forms.group({
            fullName: [null, [Validators.required]],
            companyName: [null, []],
            email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            phoneNumber: [null, []],
            subject: [null, []],
            reason: [null, []],
            message: [null, [Validators.required]]
        });
    }

    hasField(field: string): boolean {
        return this.subscription.contact.fields.includes(field);
    }

    sendMessage(): void {
        const contact: Contact = this.contactForm.getRawValue();
        this.contactService.sendMessage(contact);
    }

}
