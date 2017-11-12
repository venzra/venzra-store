import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cart, CartEventService } from '../../../services/cart.service';

@Component({
    selector: 'shopping-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

    public cart: Cart = { items: [], value: 0 };

    constructor(
        private router: Router,
        private cartEvent: CartEventService
    ) { }

    ngOnInit(): void {
        this.cartEvent.events.subscribe((cart) => this.cart = cart);
    }

    openCart(): void {
        this.router.navigate(['checkout']);
    }
}
