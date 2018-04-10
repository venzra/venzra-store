import { Component, OnInit } from '@angular/core';

import { Subscription } from '@venzra/models/subscription';

import { SubscriptionService } from '@venzra/services/subscription.service';

@Component({
    templateUrl: './store.layout.html',
    styleUrls: ['store.layout.scss']
})
export class StoreLayoutComponent implements OnInit {

    public subscription: Subscription;

    constructor(
        private subscriptionService: SubscriptionService
    ) { }

    ngOnInit(): void {
        this.subscriptionService.getSubscription().subscribe((subscription) => {
            this.subscription = subscription;
        });
    }
}
