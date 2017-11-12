import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListModel } from '../../../services/restful.service';
import { Product } from '../../../services/product.service';
import { CartService, CartEventService } from '../../../services/cart.service';

@Component({
    selector: 'product-promotions',
    templateUrl: './promotions.component.html'
})
export class PromotionsComponent implements OnInit {

    products: ListModel<Product>;

    constructor(
        private route: ActivatedRoute,
        private cartService: CartService,
        private cartEvent: CartEventService
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe((data: { products: ListModel<Product> }) => {
            this.products = data.products;
        });
    }

    show(product) {
        console.log('view');
    }

    purchase(product) {
        this.cartService.addProduct(product).then((cart) => this.cartEvent.events.emit(cart));
    }
}
