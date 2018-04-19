import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription as RxjsSubscription } from 'rxjs/Subscription';

import { Subscription } from '@venzra/models/subscription';
import { SubscriptionService } from '@venzra/services/subscription.service';

@Component({
    selector: 'venzra-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public subscription: Subscription;

    private observable: Array<RxjsSubscription> = [];

    constructor(
        private subscriptionService: SubscriptionService
    ) { }

    ngOnInit(): void {
        this.observable.push(this.subscriptionService.getSubscription().subscribe((data) => this.subscription = data));
    }

    ngOnDestroy(): void {
        this.observable.forEach((observer) => observer.unsubscribe());
    }

    hasFeature(feature: string): boolean {
        return this.subscription.features.includes(feature);
    }

}
