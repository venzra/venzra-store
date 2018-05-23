import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Address } from '@venzra/models/address';

import { AccountService } from '@venzra/services/account.service';

@Component({
    templateUrl: './remove-dialog.component.html'
})
export class AddressRemoveDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<AddressRemoveDialogComponent>,
        private accountService: AccountService,
        @Inject(MAT_DIALOG_DATA) private data: { address: Address },
    ) { }

    cancel(): void {
        this.dialogRef.close();
    }

    confirm(): void {
        this.accountService
            .removeAddress(this.data.address)
            .subscribe(() => this.dialogRef.close());
    }

}
