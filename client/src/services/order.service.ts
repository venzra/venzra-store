import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ListModel } from './restful.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './product.service';

export class Item {
    product: Product;
    quantity: number;
    price: number;
}

export class Payment {
    name: string;
    card: string;
    brand: string;
    value: number;
}

export class Shipping {
    price: number;
}

export class Address {
    addressee: string;
    building: string;
    street: string;
    city: string;
    county: string;
    postalCode: string;
}

export class Order {
    reference: string;
    items?: Item[];
    shipping?: Shipping;
    destination?: Address;
    payment?: Payment;
    status?: string;
    created?: Date;
}

@Injectable()
export class OrderService {

    constructor(
        private http: HttpClient
    ) { }

    getAllOrders(query): Promise<ListModel<Order>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());

        return this.http.get('api/v1/orders', { params })
            .toPromise()
            .then((response: any) => response as ListModel<Order>);
    }

}

@Injectable()
export class OrderListResolve implements Resolve<ListModel<Order>> {
    constructor(
        private orderService: OrderService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ListModel<Order>> {
        return this.orderService.getAllOrders(route.queryParams);
    }
}
