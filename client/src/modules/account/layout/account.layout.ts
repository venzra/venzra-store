import { Component } from '@angular/core';

import { AccountService } from '@venzra/services/account.service';

@Component({
    templateUrl: './account.layout.html',
    styleUrls: ['account.layout.scss']
})
export class AccountLayoutComponent {

    constructor(
        private accountService: AccountService
    ) { }

    logout(): void {
        this.accountService.performLogout();
    }
}
