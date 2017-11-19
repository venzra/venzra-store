import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Account, AccountService } from '../../../services/account.service';

@Component({
    selector: 'store-account',
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

    openAccount(): void {
        this.router.navigate(['account']);
    }
}
