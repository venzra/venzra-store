import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { List } from '../../models/list';
import { Product } from '../../models/product';

import { LayoutService } from '@venzra/services/layout.service';

@Component({
    templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {

    public products: List<Product>;

    constructor(
        private route: ActivatedRoute,
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Welcome';
        this.products = this.route.snapshot.data.products;
    }

}
