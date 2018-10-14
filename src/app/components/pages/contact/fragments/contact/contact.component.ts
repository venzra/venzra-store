import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { LayoutService } from '@venzra/services';

import { Subscription } from '../../models/subscription';
import { Contact } from '../../models/contact';
import { Content } from '../../models/content';
import { ContactService } from '../../services/contact.service';

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

@Component({
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    providers: [ContactService]
})
export class ContactComponent implements OnInit {

    public content: Content;
    public subscription: Subscription;

    public contactForm: FormGroup;

    public reasons = [
        'I would like to return a product',
        'I have a product enquiry',
        'Another reason that is not listed'
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private forms: FormBuilder,
        private snackbar: MatSnackBar,
        private layout: LayoutService,
        private contactService: ContactService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Contact us';

        this.content = this.route.snapshot.data.content;
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

        this.contactService
            .sendMessage(contact)
            .subscribe(
                () => this.router.navigateByUrl('/contact/confirmation'),
                () => this.snackbar.open(`Failed to send message, please try again later`, null, { duration: 5000 })
            );
    }

}
