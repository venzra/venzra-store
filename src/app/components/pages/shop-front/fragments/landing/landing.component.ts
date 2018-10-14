import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription as RxjsSubscription } from 'rxjs';

import { List, Subscription } from '@venzra/models';
import { LayoutService, SubscriptionService } from '@venzra/services';

import { Product } from '../../models/product';

@Component({
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

    public products: List<Product>;
    public subscription: Subscription;

    private observable: Array<RxjsSubscription> = [];

    constructor(
        private route: ActivatedRoute,
        private layout: LayoutService,
        private subscriptionService: SubscriptionService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Welcome';
        this.products = this.route.snapshot.data.products;
        this.observable.push(this.subscriptionService.getSubscription().subscribe((data) => this.subscription = data));
    }

    ngOnDestroy(): void {
        this.observable.forEach((observer) => observer.unsubscribe());
    }

}
