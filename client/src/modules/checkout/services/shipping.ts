import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ListModel } from '@venzra/services/restful.service';

import { Shipping } from '../models/shipping';

@Injectable()
export class ShippingService {

    constructor(
        private http: HttpClient
    ) { }

    getAllShipping(query = {}): Observable<ListModel<Shipping>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());
        return this.http.get<ListModel<Shipping>>('/api/shipping', { params });
    }
}

@Injectable()
export class ShippingListResolve implements Resolve<ListModel<Shipping>> {
    constructor(
        private shippingService: ShippingService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListModel<Shipping>> {
        return this.shippingService.getAllShipping();
    }
}
