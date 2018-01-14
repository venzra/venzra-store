import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material';

import 'rxjs/add/operator/toPromise';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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

    private cart: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({ items: [], value: 0 });

    constructor(
        private http: HttpClient,
        private snackbar: MatSnackBar
    ) { }

    addProduct(product: Product): any {
        return this.http.patch('/api/cart', [{ op: 'add', path: 'product', value: product._id }])
            .toPromise()
            .then((response: any) => response as Cart)
            .then((cart) => this.cart.next(cart))
            .then(() => this.snackbar.open(`${product.displayName} added to cart`, null, { duration: 2000 }));
    }

    removeProduct(product: Product): any {
        return this.http.patch('/api/cart', [{ op: 'remove', path: 'product', value: product._id }])
            .toPromise()
            .then((response: any) => response as Cart)
            .then((cart) => this.cart.next(cart))
            .then(() => this.snackbar.open(`${product.displayName} removed from cart`, null, { duration: 2000 }));
    }

    getCart(): BehaviorSubject<Cart> {
        return this.cart;
    }

    loadCart(): void {
        this.http.get('/api/cart')
            .toPromise()
            .then((response: any) => response as Cart)
            .then((cart) => this.cart.next(cart));
    }

}
