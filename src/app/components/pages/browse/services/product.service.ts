import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { List } from '@venzra/models';

import { Product } from '../models/product';

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    findAll(query: any = {}): Observable<List<Product>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());
        return this.http.get<List<Product>>(`/store/products`, { params });
    }
}

@Injectable()
export class ProductListResolve implements Resolve<List<Product>> {
    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<List<Product>> {
        const query = Object.assign({}, route.params, route.queryParams);
        return this.productService.findAll(query);
    }
}
