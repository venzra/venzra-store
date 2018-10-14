import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from '@venzra/models';
import { AccountService } from '@venzra/services';

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

}
