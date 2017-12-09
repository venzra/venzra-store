import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';

export class Account {
    _id?: string;
    identity: string;
}

export class AccountCredentials {
    identity: string;
    password: string;
}

@Injectable()
export class AccountService {

    private account: BehaviorSubject<Account> = new BehaviorSubject<Account>({ identity: null });

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        if (localStorage.getItem('authenticated') === '1') {
            this.http.get('api/v1/customer').subscribe((account: Account) => this.account.next(account));
        }
    }

    getAccount(): BehaviorSubject<Account> {
        return this.account;
    }

    performLogin(credentialData: AccountCredentials): Promise<boolean> {
        const redirect = localStorage.getItem('redirect') || '/account';

        return this.http.post('api/v1/identity/login', credentialData, { responseType: 'text' })
            .toPromise()
            .then(() => localStorage.setItem('authenticated', '1'))
            .then(() => localStorage.removeItem('redirect'))
            .then(() => this.router.navigate([redirect], { replaceUrl: true }));
    }

    performLogout(): Promise<void> {
        return this.http.post('api/v1/identity/logout', null, { responseType: 'text' })
            .toPromise()
            .catch(() => null)
            .then(() => localStorage.clear())
            .then(() => this.router.navigate(['/'], { replaceUrl: true }))
            .then(() => this.account.next({ identity: null }));
    }

    isAuthenticated(): Observable<boolean> {
        const subject = new BehaviorSubject<boolean>(true);
        const account = this.account.getValue();

        if(account.identity !== null) {
            subject.next(true);
        } else if (localStorage.getItem('authenticated') === '1') {
            this.http.get('api/v1/customer')
                .subscribe((account: Account) => {
                    this.account.next(account);
                    subject.next(true);
                }, () => {
                    subject.next(false);
                });
        } else {
            subject.next(false);
        }

        return subject.asObservable();
    }

}
