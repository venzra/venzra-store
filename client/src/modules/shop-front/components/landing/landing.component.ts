import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from '../../../../services/subscription.service';

import { LayoutService } from '../../../../services/layout.service';

@Component({
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    subscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe((data: { subscription: Subscription }) => {
            this.subscription = data.subscription;

            this.layout.name = this.subscription.storeName;
            this.layout.title = 'Welcome';
        });
    }
}
