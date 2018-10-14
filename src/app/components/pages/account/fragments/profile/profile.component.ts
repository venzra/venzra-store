import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Account, Address, List } from '@venzra/models';
import { AccountService, LayoutService } from '@venzra/services';
import { AddressCreateDialogComponent } from '@venzra/components/layout/addresses/create-dialog.component';
import { AddressRemoveDialogComponent } from '@venzra/components/layout/addresses/remove-dialog.component';

import { Order } from '../../models/order';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public orders: List<Order>;
    public account: Account;

    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private layout: LayoutService,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Your account';

        this.orders = this.route.snapshot.data.orders;
        this.account = this.accountService.getAccount().getValue();
    }

    createAddress() {
        this.dialog
            .open(AddressCreateDialogComponent, { width: '90%', maxWidth: '640px', disableClose: true })
            .afterClosed()
            .subscribe(() => this.account = this.accountService.getAccount().getValue());
    }

    removeAddress(address: Address) {
        this.dialog
            .open(AddressRemoveDialogComponent, { width: '90%', maxWidth: '640px', data: { address } })
            .afterClosed()
            .subscribe(() => this.account = this.accountService.getAccount().getValue());
    }

}
