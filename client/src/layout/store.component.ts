import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

import { Subscription } from '@venzra/models/subscription';

import { SubscriptionService } from '@venzra/services/subscription.service';

@Component({
    selector: 'venzra-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

    public mobileQuery: MediaQueryList;
    public subscription: Subscription;

    private mobileQueryListener: () => void;

    @ViewChild(MatSidenav) sidenav: MatSidenav;

    constructor(
        private route: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        private subscriptionService: SubscriptionService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this.mobileQueryListener);
    }

    ngOnInit(): void {
        this.subscriptionService.getSubscription().subscribe((subscription) => this.subscription = subscription);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this.mobileQueryListener);
    }

}
