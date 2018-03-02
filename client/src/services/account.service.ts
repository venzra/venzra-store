import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { Account } from '../models/account';
import { AccountCredentials } from '../models/credentials';

@Injectable()
export class AccountService {

    private account: BehaviorSubject<Account> = new BehaviorSubject<Account>({ identity: null });

    constructor(
        private http: HttpClient,
        private router: Router,
        private snackbar: MatSnackBar
    ) {
        if (localStorage.getItem('authenticated') === '1') {
            this.http.get('/api/customer').subscribe((account: Account) => this.account.next(account));
        }
    }

    getAccount(): BehaviorSubject<Account> {
        return this.account;
    }

    performLogin(credentialData: AccountCredentials): void {
        const redirect = localStorage.getItem('redirect') || '/account';

        this.http.post('/api/identity/login', credentialData, { responseType: 'text' })
            .toPromise()
            .then(() => localStorage.setItem('authenticated', '1'))
            .then(() => localStorage.removeItem('redirect'))
            .then(() => this.router.navigate([redirect], { replaceUrl: true }))
            .catch(() => this.snackbar.open('Login failed, please try again', 'OK', { duration: 5000 }));
    }

    performLogout(): void {
        this.http.post('/api/identity/logout', null, { responseType: 'text' })
            .toPromise()
            .catch(() => null)
            .then(() => localStorage.clear())
            .then(() => this.router.navigate(['/'], { replaceUrl: true }))
            .then(() => this.account.next({ identity: null }));
    }

    isAuthenticated(): Observable<boolean> {
        const subject = new BehaviorSubject<boolean>(true);
        const account = this.account.getValue();

        if (account.identity !== null) {
            subject.next(true);
        } else if (localStorage.getItem('authenticated') === '1') {
            this.http.get('/api/customer')
                .subscribe((customer: Account) => {
                    this.account.next(customer);
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
