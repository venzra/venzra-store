import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { SubscriptionService } from './subscription.service';

@Injectable()
export class ContentGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private router: Router,
        private subscriptionService: SubscriptionService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.checkFeature(route.data.feature);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivate(childRoute, state);
    }

    canLoad(route: Route): Promise<boolean> {
        return this.checkFeature(route.data.feature);
    }

    checkFeature(feature: string): Promise<boolean>  {
        return this.subscriptionService
            .find()
            .then((subscription) => {
                if (!subscription.features.includes(feature)) {
                    this.router.navigateByUrl('/');
                }
                return true;
            });
    }
}
