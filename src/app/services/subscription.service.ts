import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable, ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

import { Subscription } from '@venzra/models';

@Injectable()
export class SubscriptionService {

    private subscription: ReplaySubject<Subscription> = new ReplaySubject<Subscription>(1);

    constructor(
        private http: HttpClient
    ) { }

    loadSubscription(): Observable<Subscription> {
        this.http.get<Subscription>('/store/subscription').subscribe((subscription) => this.subscription.next(subscription));
        return this.subscription.asObservable();
    }

    getSubscription(): ReplaySubject<Subscription> {
        return this.subscription;
    }

}

@Injectable()
export class SubscriptionRetrieveResolve implements Resolve<Subscription> {

    constructor(
        private subscriptionService: SubscriptionService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subscription> {
        return this.subscriptionService.loadSubscription().pipe(first());
    }

}
