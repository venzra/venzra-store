import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Cart } from '@venzra/models';
import { CartService, LayoutService } from '@venzra/services';

@Component({
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

    public cart: Cart;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar,
        private layout: LayoutService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Shopping basket';
        this.cartService.getCart().subscribe((cart) => this.cart = cart);
    }

    increment(item) {
        this.cartService.addProduct(item.product);
    }

    decrement(item) {
        this.cartService.removeProduct(item.product);
    }

    checkout(): void {
        this.router.navigate(['checkout/payment']);
    }

}
