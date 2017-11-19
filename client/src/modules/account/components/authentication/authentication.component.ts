import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AccountCredentials, AccountService } from '../../../../services/account.service';

import { LayoutService } from '../../../../services/layout.service';

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

@Component({
    templateUrl: './authentication.component.html'
})
export class AuthenticationComponent implements OnInit {

    public authenticationForm: FormGroup;

    private credentials: AccountCredentials;

    constructor(
        private forms: FormBuilder,
        private snackbar: MatSnackBar,
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
            emailAddress: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            password: ['', [Validators.required]]
        });
    }

    login(): void {
        const credentialData = this.authenticationForm.value;

        this.credentials = {
            identity: credentialData.emailAddress as string,
            password: credentialData.password as string
        };

        this.accountService
            .performLogin(this.credentials)
            .catch(() => this.snackbar.open('Login failed, please try again', 'OK', { duration: 5000 }));
    }

}
