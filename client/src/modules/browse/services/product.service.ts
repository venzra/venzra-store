import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { ListModel } from '@venzra/services/restful.service';

import { Product } from '../models/product';

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    findOne(productSlug: string): Promise<Product> {
        return this.http.get<Product>(`/api/products/${productSlug}`).toPromise();
    }

    findAll(query: any = {}): Promise<ListModel<Product>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());
        return this.http.get<ListModel<Product>>(`/api/products`, { params }).toPromise();
    }
}

@Injectable()
export class ProductRetrieveResolve implements Resolve<Product> {
    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Product> {
        return this.productService.findOne(route.params.product);
    }
}

@Injectable()
export class ProductListResolve implements Resolve<ListModel<Product>> {
    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ListModel<Product>> {
        const query = Object.assign({}, route.params, route.queryParams);
        return this.productService.findAll(query);
    }
}
