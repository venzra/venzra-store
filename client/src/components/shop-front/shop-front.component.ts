import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from '../../models/subscription';

import { LayoutService } from '../../layout.service';

@Component({
    templateUrl: './shop-front.component.html',
    styleUrls: ['./shop-front.component.css']
})
export class ShopFrontComponent implements OnInit {

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
