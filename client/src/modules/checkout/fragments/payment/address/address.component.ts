import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomerService } from '../../../services/customer.service';

@Component({
    templateUrl: './address.component.html'
})
export class PaymentAddressDialogComponent implements OnInit {

    public addressForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<PaymentAddressDialogComponent>,
        private forms: FormBuilder,
        private customerService: CustomerService
    ) { }

    ngOnInit(): void {
        this.addressForm = this.forms.group({
            addressee: [null, [Validators.required, Validators.maxLength(80)]],
            street: [null, [Validators.required, Validators.maxLength(50)]],
            building: [null, [Validators.maxLength(50)]],
            city: [null, [Validators.maxLength(50)]],
            county: [null, [Validators.required, Validators.maxLength(50)]],
            country: ['GB'],
            postalCode: [null, [Validators.required, Validators.maxLength(12)]]
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    save(): void {
        this.customerService
            .createAddress(this.addressForm.getRawValue())
            .subscribe((customer) => this.dialogRef.close(customer));
    }

}
