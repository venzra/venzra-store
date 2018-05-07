import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRadioChange, MatSnackBar } from '@angular/material';

import { Cart } from '@venzra/models/cart';
import { CartService } from '@venzra/services/cart.service';
import { LayoutService } from '@venzra/layout/services/layout.service';

import { List } from '../../models/list';
import { Shipping } from '../../models/shipping';

@Component({
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

    public cart: Cart;
    public shippingData: List<Shipping>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private snackbar: MatSnackBar,
        private layout: LayoutService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Shopping basket';

        this.shippingData = this.route.snapshot.data.shippingData;
        this.cartService.getCart().subscribe((cart) => this.cart = cart);
    }

    increment(item) {
        this.cartService.addProduct(item.product);
    }

    decrement(item) {
        this.cartService.removeProduct(item.product);
    }

    checkShipping(shipping: Shipping) {
        let available = true;

        if (shipping.cartMinimum !== 0 && shipping.cartMinimum > this.cart.value) {
            available = false;
        }

        if (shipping.cartMaximum !== 0 && this.cart.value > shipping.cartMaximum) {
            available = false;
        }

        return available;
    }

    selectedShipping(shipping: Shipping) {
        if (this.cart.shipping) {
            return this.cart.shipping.reference === shipping._id;
        }
        return false;
    }

    updateShipping(event: MatRadioChange) {
        this.cartService.allocateShipping(event.value).subscribe(null, () => this.snackbar.open(`Failed to allocate shipping option`, null, { duration: 2000 }));
    }

    checkout(): void {
        this.router.navigate(['checkout/payment']);
    }

}
