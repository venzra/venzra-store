import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LayoutService } from '../../../../services/layout.service';
import { Cart, CartEventService, CartService } from '../../../../services/cart.service';

@Component({
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

    cart: Cart;

    constructor(
        private route: ActivatedRoute,
        private layout: LayoutService,
        private cartService: CartService,
        private cartEvent: CartEventService
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe((data: { cart: Cart }) => {
            this.cart = data.cart;

            this.layout.title = 'Cart';
        });

        this.cartEvent.events.subscribe((cart) => this.cart = cart);
    }

    increment(item) {
        this.cartService.addProduct(item.product)
            .then((cart) => this.cartEvent.events.emit(cart));
    }

    decrement(item) {
        this.cartService.removeProduct(item.product)
            .then((cart) => this.cartEvent.events.emit(cart));
    }

}
