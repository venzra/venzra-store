import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cart, CartService } from '../../../services/cart.service';

@Component({
    selector: 'shopping-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

    public cart: Cart;

    constructor(
        private router: Router,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.cartService.loadCart();
        this.cartService.getCart().subscribe((cart) => this.cart = cart);
    }

}
