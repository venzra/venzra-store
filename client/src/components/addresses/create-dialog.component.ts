import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '@venzra/services/account.service';

@Component({
    templateUrl: './create-dialog.component.html'
})
export class AddressCreateDialogComponent implements OnInit {

    public addressForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AddressCreateDialogComponent>,
        private forms: FormBuilder,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.addressForm = this.forms.group({
            addressee: [null, [Validators.required, Validators.maxLength(80)]],
            street: [null, [Validators.required, Validators.maxLength(50)]],
            building: [null, [Validators.maxLength(50)]],
            city: [null, [Validators.maxLength(50)]],
            county: [null, [Validators.required, Validators.maxLength(50)]],
            country: ['GB'],
            postalCode: [null, [Validators.required, Validators.maxLength(12)]],
            makeDefault: [false, []]
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    save(): void {
        this.accountService
            .createAddress(this.addressForm.getRawValue())
            .subscribe((customer) => this.dialogRef.close(customer));
    }

}
