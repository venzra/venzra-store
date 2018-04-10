import { Component, OnInit } from '@angular/core';

import { Account } from '@venzra/models/account';

import { AccountService } from '@venzra/services/account.service';
import { LayoutService } from '@venzra/services/layout.service';

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
