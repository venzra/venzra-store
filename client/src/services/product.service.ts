import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ListModel } from './restful.service';

export class Product {
    _id?: string;
    slug?: string;
    code?: string;
    displayName: string;
    featureImage?: string;
    promotionalImage?: string;
    previousPrice?: number;
    currentPrice: number;
}

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    getProduct(productSlug: string): Promise<Product> {
        return this.http.get(`/api/products/${productSlug}`)
            .toPromise()
            .then((response: any) => response as Product);
    }

    getAllProducts(query): Promise<ListModel<Product>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());

        return this.http.get('/api/products', { params })
            .toPromise()
            .then((response: any) => response as ListModel<Product>);
    }
}

@Injectable()
export class ProductRetrieveResolve implements Resolve<Product> {
    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Product> {
        return this.productService.getProduct(route.params.productSlug);
    }
}

@Injectable()
export class ProductPromotionsResolve implements Resolve<ListModel<Product>> {
    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ListModel<Product>> {
        return this.productService.getAllProducts({ limit: 4 });
    }
}
