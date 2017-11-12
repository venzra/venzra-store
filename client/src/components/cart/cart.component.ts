import { Component, OnInit } from '@angular/core';

import { Cart, CartEventService } from '../../services/cart.service';

@Component({
    selector: 'shopping-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

    public cart: Cart = { items: [], value: 0 };

    constructor(
        private cartEvent: CartEventService
    ) { }

    ngOnInit(): void {
        this.cartEvent.events.subscribe((cart) => this.cart = cart);
    }

    openCart(): void {
        console.log('View cart page');
    }
}
