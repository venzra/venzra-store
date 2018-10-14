import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { List } from '@venzra/models';

import { Shipping } from '../models/shipping';

@Injectable()
export class ShippingService {

    constructor(
        private http: HttpClient
    ) { }

    getAllShipping(query = {}): Observable<List<Shipping>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());
        return this.http.get<List<Shipping>>('/store/shipping', { params });
    }
}

@Injectable()
export class ShippingListResolve implements Resolve<List<Shipping>> {
    constructor(
        private shippingService: ShippingService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<List<Shipping>> {
        return this.shippingService.getAllShipping();
    }
}
