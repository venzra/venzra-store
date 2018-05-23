import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Account } from '../models/account';
import { Address } from '../models/address';
import { AccountCredentials } from '../models/credentials';

@Injectable({
    providedIn: 'root'
})
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
            .subscribe(
                () => {
                    localStorage.setItem('authenticated', '1');
                    localStorage.removeItem('redirect');
                    this.router.navigate([redirect], { replaceUrl: true });
                },
                () => this.snackbar.open('Login failed, please try again', 'OK', { duration: 5000 })
            );
    }

    performLogout(): Observable<boolean> {
        return this.http.post('/api/identity/logout', null, { responseType: 'text' })
            .pipe(
                map(() => {
                    localStorage.clear();
                    this.router.navigate(['/'], { replaceUrl: true });
                    this.account.next({ identity: null });
                    return true;
                })
            );
    }

    createAddress(address: Address): Observable<Account> {
        return this.http.post<Account>('/api/customer/addresses', address)
            .pipe(tap((account) => this.account.next(account)));
    }

    removeAddress(address: Address): Observable<boolean> {
        return this.http.delete<boolean>(`/api/customer/addresses/${address._id}`)
            .pipe(tap(() => this.http.get<Account>('/api/customer').subscribe((account) => this.account.next(account))));
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

@Injectable({
    providedIn: 'root'
})
export class AccountLogoutResolve implements Resolve<boolean> {

    constructor(
        private accountService: AccountService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.accountService.performLogout();
    }

}

