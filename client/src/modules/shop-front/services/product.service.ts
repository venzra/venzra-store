import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { List } from '../models/list';
import { Product } from '../models/product';

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    getAllProducts(query = {}): Promise<List<Product>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());
        return this.http.get<List<Product>>('/api/products', { params }).toPromise();
    }
}

@Injectable()
export class ProductListResolve implements Resolve<List<Product>> {
    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<List<Product>> {
        return this.productService.getAllProducts();
    }
}
