import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

export class Subscription {
    _id: string;
    storeName: string;
    strapline: string;
    status: string;
    created: Date;
    updated: Date;
}

@Injectable()
export class SubscriptionService {

    private subscriptionUri = 'api/v1/subscription';

    constructor(
        private http: HttpClient
    ) { }

    getSubscription(): Promise<Subscription> {
        return this.http.get(this.subscriptionUri)
            .toPromise()
            .then((response) => response as Subscription);
    }
}

@Injectable()
export class SubscriptionRetrieveResolve implements Resolve<Subscription> {
    constructor(
        private subscriptionService: SubscriptionService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Subscription> {
        return this.subscriptionService.getSubscription();
    }
}
