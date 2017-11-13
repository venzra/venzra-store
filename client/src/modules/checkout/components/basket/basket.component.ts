import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../../../services/layout.service';
import { Cart, CartService } from '../../../../services/cart.service';

@Component({
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

    cart: Cart = new Cart();

    constructor(
        private layout: LayoutService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Cart';
        this.cartService.getCart().subscribe((cart) => this.cart = cart);
    }

    increment(item) {
        this.cartService.addProduct(item.product)
            .then((cart) => this.cartService.getCart().next(cart));
    }

    decrement(item) {
        this.cartService.removeProduct(item.product)
            .then((cart) => this.cartService.getCart().next(cart));
    }

}
