import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/toPromise';

import { Product } from './product.service';

export class CartItem {
    _id: string;
    product: Product;
    quantity: number;
}

export class Cart {
    _id?: string;
    items: CartItem[];
    value: number;
}

@Injectable()
export class CartService {

    private cart: ReplaySubject<Cart> = new ReplaySubject();

    constructor(
        private http: HttpClient,
        private snackbar: MatSnackBar
    ) { }

    cleanValues(cart) {
        cart.items.forEach((item) => {
            item.product.previousPrice /= 100;
            item.product.currentPrice /= 100;
            return item;
        });
        cart.value /= 100;
        return cart;
    }

    addProduct(product: Product): any {
        return this.http.patch('/api/v1/cart', [{ op: 'add', path: 'product', value: product._id }])
            .toPromise()
            .then((response: any) => response as Cart)
            .then((cart) => this.cleanValues(cart))
            .then((cart) => this.cart.next(cart))
            .then(() => this.snackbar.open(`${product.displayName} added to cart`, null, { duration: 2000 }));
    }

    removeProduct(product: Product): any {
        return this.http.patch('/api/v1/cart', [{ op: 'remove', path: 'product', value: product._id }])
            .toPromise()
            .then((response: any) => response as Cart)
            .then((cart) => this.cleanValues(cart))
            .then((cart) => this.cart.next(cart))
            .then(() => this.snackbar.open(`${product.displayName} removed from cart`, null, { duration: 2000 }));
    }

    getCart(): ReplaySubject<Cart> {
        return this.cart;
    }

    loadCart(): void {
        this.http.get('api/v1/cart')
            .toPromise()
            .then((response: any) => response as Cart)
            .then((cart) => this.cleanValues(cart))
            .then((cart) => this.cart.next(cart));
    }

}
