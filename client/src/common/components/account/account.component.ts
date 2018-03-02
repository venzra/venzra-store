import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from '../../../models/account';

import { AccountService } from '../../../services/account.service';

@Component({
    selector: 'venzra-account',
    templateUrl: './account.component.html'
})
export class AccountComponent {

    public account: Account;

    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        accountService.getAccount().subscribe((account) => this.account = account);
    }

}
