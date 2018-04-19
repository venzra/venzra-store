import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { List } from '../../models/list';
import { Product } from '../../models/product';

import { LayoutService } from '@venzra/layout/services/layout.service';
import { SubscriptionService } from '@venzra/services/subscription.service';
import { Subscription } from '@venzra/models/subscription';
import { Subscription as RxjsSubscription } from 'rxjs/Subscription';

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
