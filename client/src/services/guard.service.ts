import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/first';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';

import { AccountService } from './account.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const url: string = state.url;

        return this.checkLogin(url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(childRoute, state);
    }

    canLoad(route: Route): Observable<boolean> {
        const url = `/${route.path}`;

        return this.checkLogin(url);
    }

    private checkLogin(url: string): Observable<boolean> {
        let authenticated = this.accountService.isAuthenticated();
        let subject = new BehaviorSubject<boolean>(false);

        authenticated.subscribe((res) => {
            if (!res) {
                localStorage.setItem('redirect', url);
                this.router.navigate(['/account/authenticate'], { replaceUrl: true });
            }
            subject.next(res);
        });

        return subject.asObservable().first();
    }
}
