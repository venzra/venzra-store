import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Subscription } from '../models/subscription';

@Injectable()
export class SubscriptionService {

    constructor(
        private http: HttpClient
    ) { }

    find(): Observable<Subscription> {
        return this.http.get<Subscription>('/api/subscription');
    }

}

@Injectable()
export class SubscriptionRetrieveResolve implements Resolve<Subscription> {

    constructor(
        private subscriptionService: SubscriptionService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subscription> {
        return this.subscriptionService.find();
    }

}
