import { Component, OnInit } from '@angular/core';

import { Subscription, SubscriptionService } from './services/subscription.service';

import { LayoutService } from './services/layout.service';

@Component({
    selector: 'venzra-public',
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

    public subscription: Subscription;

    constructor(
        private subscriptionService: SubscriptionService,
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.subscriptionService.getSubscription().subscribe((subscription) => {
            this.subscription = subscription;
            this.layout.name = subscription.storeName;
        });
    }
}
