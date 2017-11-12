import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    addProduct(product: Product): Promise<Cart> {
        return this.http.patch('/api/v1/cart', [{ op: 'add', path: 'product', value: product._id }])
            .toPromise()
            .then((response: any) => response as Cart)
            .then((cart) => {
                cart.value /= 100;
                return cart;
            });
    }

    getCart(): Promise<Cart> {
        return this.http.get('api/v1/cart')
            .toPromise()
            .then((response: any) => response as Cart)
            .then((cart) => {
                cart.value /= 100;
                return cart;
            });
    }

}

@Injectable()
export class CartEventEmitter extends Subject<Cart> {

    constructor(
        cart: CartService
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
