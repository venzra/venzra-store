import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { List } from '@venzra/models';

import { Order } from '../models/order';

@Injectable()
export class OrderService {

    constructor(
        private http: HttpClient
    ) { }

    getAllOrders(query): Observable<List<Order>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());
        return this.http.get<List<Order>>('/store/orders', { params });
    }

}

@Injectable()
export class OrderListResolve implements Resolve<List<Order>> {
    constructor(
        private orderService: OrderService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<List<Order>> {
        return this.orderService.getAllOrders(route.queryParams);
    }
}
