import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription as RxjsSubscription } from 'rxjs/Subscription';

import { Subscription } from '@venzra/models/subscription';
import { SubscriptionService } from '@venzra/services/subscription.service';
import { NavigationService } from '@venzra/services/navigation.service';

@Component({
    selector: 'venzra-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public subscription: Subscription;
    public hasNavigation: boolean;

    private observable: Array<RxjsSubscription> = [];

    @Input('navigationToggle') public navigationToggle;

    constructor(
        private subscriptionService: SubscriptionService,
        private navigationService: NavigationService
    ) { }

    ngOnInit(): void {
        this.observable.push(this.subscriptionService.getSubscription().subscribe((data) => this.subscription = data));

        this.navigationService.displayNavigation.subscribe((displayNavigation) => this.hasNavigation = displayNavigation);
    }

    ngOnDestroy(): void {
        this.observable.forEach((observer) => observer.unsubscribe());
    }

    toggleNavigation() {
        if (this.hasNavigation) {
            this.navigationToggle.toggle();
        }
    }

    hasFeature(feature: string): boolean {
        return this.subscription.features.includes(feature);
    }

}
