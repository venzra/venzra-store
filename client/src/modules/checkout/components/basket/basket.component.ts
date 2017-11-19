import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartService } from '../../../../services/cart.service';

import { LayoutService } from '../../../../services/layout.service';

@Component({
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

    cart: Cart = new Cart();

    constructor(
        private router: Router,
        private layout: LayoutService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Cart';
        this.cartService.getCart().subscribe((cart) => this.cart = cart);
    }

    increment(item) {
        this.cartService.addProduct(item.product);
    }

    decrement(item) {
        this.cartService.removeProduct(item.product);
    }

    nextStep(): void {
        this.router.navigate(['checkout/payment']);
    }

}
