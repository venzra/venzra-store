import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Cart, Product } from '@venzra/models';

@Injectable()
export class CartService {

    private cart: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({ items: [], value: 0 });

    constructor(
        private http: HttpClient,
        private snackbar: MatSnackBar
    ) { }

    addProduct(product: Product): void {
        this.http.patch<Cart>('/store/cart', [{ op: 'add', path: 'product', value: product._id }])
            .subscribe((cart) => {
                this.cart.next(cart);
                this.snackbar.open(`${product.displayName} added to cart`, null, { duration: 2000 });
            });
    }

    removeProduct(product: Product): void {
        this.http.patch<Cart>('/store/cart', [{ op: 'remove', path: 'product', value: product._id }])
            .subscribe((cart) => {
                this.cart.next(cart);
                this.snackbar.open(`${product.displayName} removed from cart`, null, { duration: 2000 });
            });
    }

    allocateShipping(shippingId): Observable<Cart> {
        return this.http.patch<Cart>('/store/cart', [{ op: 'replace', path: 'shipping', value: shippingId }])
            .pipe(tap((cart) => this.cart.next(cart)));
    }

    getCart(): BehaviorSubject<Cart> {
        return this.cart;
    }

    loadCart(): void {
        this.http.get<Cart>('/store/cart').subscribe((cart) => this.cart.next(cart));
    }

}
