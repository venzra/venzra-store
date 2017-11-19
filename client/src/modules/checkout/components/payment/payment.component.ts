import { Component, OnInit } from '@angular/core';
import { Cart, CartService } from '../../../../services/cart.service';

import { LayoutService } from '../../../../services/layout.service';

@Component({
    templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

    cart: Cart = new Cart();

    constructor(
        private layout: LayoutService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Cart';
        this.cartService.getCart().subscribe((cart) => this.cart = cart);
    }

}
