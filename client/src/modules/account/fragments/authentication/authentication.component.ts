import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { AccountCredentials } from '@venzra/models/credentials';

import { LayoutService } from '@venzra/layout/services/layout.service';
import { AccountService } from '@venzra/services/account.service';

import { CustomerService } from '../../services/customer.service';

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

@Component({
    templateUrl: './authentication.component.html',
    providers: [CustomerService]
})
export class AuthenticationComponent implements OnInit {

    public authenticationForm: FormGroup;

    private credentials: AccountCredentials;

    constructor(
        private forms: FormBuilder,
        private layout: LayoutService,
        private accountService: AccountService,
        private customerService: CustomerService
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.layout.title = 'Login / Register';
    }

    createForm(): void {
        this.authenticationForm = this.forms.group({
            emailAddress: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            password: [null, [Validators.required, Validators.minLength(8)]]
        });

        this.authenticationForm.get('password').valueChanges.pipe(debounceTime(500)).subscribe((password) => {
            if (this.authenticationForm.get('password').invalid) {
                return;
            }

            this.customerService.validatePassword(password).subscribe((validation) => {
                if (validation.score < 3) {
                    this.authenticationForm.get('password').setErrors({ strength: true });
                }
            });
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
