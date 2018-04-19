import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Account } from '@venzra/models/account';

import { AccountService } from '@venzra/services/account.service';
import { LayoutService } from '@venzra/layout/services/layout.service';

import 'rxjs/add/operator/debounceTime';

import { CustomerService } from '../../services/customer.service';

@Component({
    templateUrl: './password.component.html',
    providers: [CustomerService]
})
export class PasswordComponent implements OnInit {

    public account: Account;
    public passwordForm: FormGroup;
    public suggestion = '';

    constructor(
        private router: Router,
        private forms: FormBuilder,
        private snackbar: MatSnackBar,
        private layout: LayoutService,
        private accountService: AccountService,
        private customerService: CustomerService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Change password';

        this.passwordForm = this.forms.group({
            current: [null, [Validators.required]],
            password: [null, [Validators.required]],
            confirmation: [null, [Validators.required]]
        }, { validator: this.passwordMatch });

        this.passwordForm.get('password').valueChanges.debounceTime(500).subscribe((password) => {
            if (this.passwordForm.get('password').invalid) {
                return;
            }

            this.customerService.validatePassword(password).then((validation) => {
                if (validation.score < 3) {
                    this.passwordForm.get('password').setErrors({ strength: true });
                    this.suggestion = validation.message;
                }
            });
        });

        this.accountService.getAccount().subscribe((account) => this.account = account);
    }

    passwordMatch(control: AbstractControl) {
        const password = control.get('password').value;
        const confirmation = control.get('confirmation').value;
        const match: Boolean = password !== confirmation;

        control.get('confirmation').setErrors(match ? { match } : null);
    }

    changePassword() {
        this.customerService
            .changePassword(this.passwordForm.getRawValue())
            .then(() => this.router.navigate(['/account/password/confirmation']))
            .catch(() => this.snackbar.open('Change of password failed', 'OK', { duration: 5000 }));
    }
}
