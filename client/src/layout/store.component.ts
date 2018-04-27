import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

import { Subscription } from '@venzra/models/subscription';
import { NavigationSection } from '@venzra/models/navigation-section';

import { SubscriptionService } from '@venzra/services/subscription.service';
import { NavigationService } from '@venzra/services/navigation.service';

import { delay } from 'rxjs/operators';

@Component({
    selector: 'venzra-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

    public mobileQuery: MediaQueryList;
    public subscription: Subscription;
    public hasNavigation: boolean;
    public navigationItems: Array<NavigationSection>;

    private mobileQueryListener: () => void;

    @ViewChild(MatSidenav) sidenav: MatSidenav;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        private subscriptionService: SubscriptionService,
        private navigationService: NavigationService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this.mobileQueryListener);
    }

    ngOnInit(): void {
        this.subscriptionService.getSubscription().subscribe((subscription) => this.subscription = subscription);

        this.router.events.subscribe((event: NavigationEnd) => {
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
            }
        });

        this.navigationService.displayNavigation.subscribe((displayNavigation) => {
            if (this.hasNavigation !== displayNavigation) {
                this.hasNavigation = displayNavigation;
                if (!this.mobileQuery.matches) {
                    this.sidenav[this.hasNavigation ? 'open' : 'close']();
                }
            }
        });

        this.navigationService.getNavigation()
            .pipe(delay(100))
            .subscribe((currentNavigation) => this.navigationItems = currentNavigation);

    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this.mobileQueryListener);
    }

}
