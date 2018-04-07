import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { Subscription } from '../models/subscription';

@Injectable()
export class SubscriptionService {

    constructor(
        private http: HttpClient
    ) { }

    find(): Promise<Subscription> {
        return this.http.get<Subscription>('/api/subscription').toPromise();
    }

}

@Injectable()
export class SubscriptionRetrieveResolve implements Resolve<Subscription> {

    constructor(
        private subscriptionService: SubscriptionService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Subscription> {
        return this.subscriptionService.find();
    }

}
