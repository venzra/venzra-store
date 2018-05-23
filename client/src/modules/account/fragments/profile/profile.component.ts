import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Account } from '@venzra/models/account';
import { Address } from '@venzra/models/address';

import { AddressCreateDialogComponent } from '@venzra/components/addresses/create-dialog.component';
import { AddressRemoveDialogComponent } from '@venzra/components/addresses/remove-dialog.component';

import { Order } from '../../models/order';
import { List } from '../../models/list';

import { AccountService } from '@venzra/services/account.service';
import { LayoutService } from '@venzra/layout/services/layout.service';

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
        this.accountService.getAccount().subscribe((account) => this.account = account);
    }

    createAddress() {
        this.dialog.open(AddressCreateDialogComponent, { width: '90%', maxWidth: '640px', disableClose: true });
    }

    removeAddress(address: Address) {
        this.dialog.open(AddressRemoveDialogComponent, { width: '90%', maxWidth: '640px', data: { address } });
    }

}
