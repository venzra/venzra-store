import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LayoutService } from '../../../../services/layout.service';
import { Product } from '../../../../services/product.service';
import { ListModel } from '../../../../services/restful.service';

@Component({
    templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {

    products: ListModel<Product>;

    constructor(
        private route: ActivatedRoute,
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Welcome';

        this.route.data.subscribe((data: { products: ListModel<Product> }) => {
            this.products = data.products;
        });
    }

}
