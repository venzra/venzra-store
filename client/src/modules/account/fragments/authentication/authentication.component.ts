import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountCredentials } from '@venzra/models/credentials';

import { LayoutService } from '@venzra/services/layout.service';
import { AccountService } from '@venzra/services/account.service';

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

@Component({
    templateUrl: './authentication.component.html'
})
export class AuthenticationComponent implements OnInit {

    public authenticationForm: FormGroup;

    private credentials: AccountCredentials;

    constructor(
        private forms: FormBuilder,
        private layout: LayoutService,
        private accountService: AccountService
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.layout.title = 'Authentication';
    }

    createForm(): void {
        this.authenticationForm = this.forms.group({
            emailAddress: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            password: [null, [Validators.required, Validators.minLength(8)]]
        });
    }

    login(): void {
        const credentialData = this.authenticationForm.value;

        this.credentials = {
            identity: <string>credentialData.emailAddress,
            password: <string>credentialData.password
        };

        this.accountService.performLogin(this.credentials);
    }

}
