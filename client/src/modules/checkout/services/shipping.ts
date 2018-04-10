import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ListModel } from '@venzra/services/restful.service';

export class Shipping {
    _id?: string;
    displayName: string;
    currentPrice: number;
    cartMinimum: number;
    cartMaximum: number;
}

@Injectable()
export class ShippingService {

    constructor(
        private http: HttpClient
    ) { }

    getAllShipping(query = {}): Promise<ListModel<Shipping>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());
        return this.http.get<ListModel<Shipping>>('/api/shipping', { params }).toPromise();
    }
}

@Injectable()
export class ShippingListResolve implements Resolve<ListModel<Shipping>> {
    constructor(
        private shippingService: ShippingService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ListModel<Shipping>> {
        return this.shippingService.getAllShipping();
    }
}
