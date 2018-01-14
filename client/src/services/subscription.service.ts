import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

export class Subscription {
    _id?: string;
    storeName: string;
    strapline?: string;
    gateway?: string;
    status?: string;
    created?: Date;
    updated?: Date;
}

@Injectable()
export class SubscriptionService {

    private subscription: ReplaySubject<Subscription> = new ReplaySubject<Subscription>(1);

    constructor(
        private http: HttpClient
    ) { }

    loadSubscription(): Observable<Subscription> {
        this.http.get<Subscription>('/api/subscription').subscribe((subscription) => this.subscription.next(subscription));
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
        return this.subscriptionService.loadSubscription().first();
    }
}
