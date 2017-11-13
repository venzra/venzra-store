import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Subject } from 'rxjs/Subject';
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

    constructor(
        private http: HttpClient
    ) { }

    cleanValues(cart) {
        cart.items.forEach((item) => {
            item.product.retailPrice /= 100;
            item.product.storePrice /= 100;
            return item;
        });
        cart.value /= 100;
        return cart;
    }

    addProduct(product: Product): Promise<Cart> {
        return this.http.patch('/api/v1/cart', [{ op: 'add', path: 'product', value: product._id }])
            .toPromise()
            .then((response: any) => response as Cart)
            .then((cart) => this.cleanValues(cart));
    }

    removeProduct(product: Product): Promise<Cart> {
        return this.http.patch('/api/v1/cart', [{ op: 'remove', path: 'product', value: product._id }])
            .toPromise()
            .then((response: any) => response as Cart)
            .then((cart) => this.cleanValues(cart));
    }

    getCart(): Promise<Cart> {
        return this.http.get('api/v1/cart')
            .toPromise()
            .then((response: any) => response as Cart)
            .then((cart) => this.cleanValues(cart));
    }

}

@Injectable()
export class CartRetrieveResolve implements Resolve<Cart> {
    constructor(
        private cartService: CartService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Cart> {
        return this.cartService.getCart();
    }
}

@Injectable()
export class CartEventEmitter extends Subject<Cart> {

    constructor(
        private cart: CartService
    ) {
        super();
        cart.getCart().then((cart) => super.next(cart));
    }

    emit(value) {
        super.next(value);
    }

}

@Injectable()
export class CartEventService {

    constructor(
        public events: CartEventEmitter
    ) { }

}
