import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from '@venzra/models/account';

import { AccountService } from '@venzra/services/account.service';

@Component({
    selector: 'venzra-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent {

    public account: Account;

    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        accountService.getAccount().subscribe((account) => this.account = account);
    }

    logout(): void {
        this.accountService.performLogout();
    }

}
