import { Component, OnInit } from '@angular/core';

import { Subscription } from './models/subscription';

import { LayoutService } from './services/layout.service';
import { SubscriptionService } from './services/subscription.service';


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

    hasFeature(feature: string): boolean {
        return this.subscription.features.includes(feature);
    }
}
