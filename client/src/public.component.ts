import { Component, OnInit } from '@angular/core';

import { SubscriptionService } from './services/subscription.service';

import { LayoutService } from './services/layout.service';

@Component({
    selector: 'app-public',
    templateUrl: './public.component.html'
})
export class PublicComponent implements OnInit {

    constructor(
        private subscriptionService: SubscriptionService,
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.subscriptionService.getSubscription().subscribe((subscription) => {
            this.layout.name = subscription.storeName;
        });
    }
}
