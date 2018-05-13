import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ListModel } from '@venzra/services/restful.service';

import { Product } from '../models/product';

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    findAll(query: any = {}): Observable<ListModel<Product>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());
        return this.http.get<ListModel<Product>>(`/api/products`, { params });
    }
}

@Injectable()
export class ProductListResolve implements Resolve<ListModel<Product>> {
    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListModel<Product>> {
        const query = Object.assign({}, route.params, route.queryParams);
        return this.productService.findAll(query);
    }
}
