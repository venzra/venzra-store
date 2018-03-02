import { Component, OnInit } from '@angular/core';

import { Account } from '../../../../models/account';

import { AccountService } from '../../../../services/account.service';
import { LayoutService } from '../../../../services/layout.service';

@Component({
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    public account: Account;

    constructor(
        private layout: LayoutService,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Account Profile';

        this.accountService.getAccount().subscribe((account) => this.account = account);
    }
}
