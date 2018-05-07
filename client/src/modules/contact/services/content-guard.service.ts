import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SubscriptionService } from './subscription.service';

@Injectable()
export class ContentGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private router: Router,
        private subscriptionService: SubscriptionService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkFeature(route.data.feature);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(childRoute, state);
    }

    canLoad(route: Route): Observable<boolean> {
        return this.checkFeature(route.data.feature);
    }

    checkFeature(feature: string): Observable<boolean>  {
        return this.subscriptionService
            .find()
            .pipe(map((subscription) => {
                if (!subscription.features.includes(feature)) {
                    this.router.navigateByUrl('/');
                }
                return true;
            }));
    }
}
