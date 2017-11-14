import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ListModel } from './restful.service';

export class Product {
    _id?: string;
    code?: string;
    displayName: string;
    previousPrice?: number;
    currentPrice: number;
}

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    getProduct(productSlug: string): Promise<Product> {
        return this.http.get(`api/v1/products/${productSlug}`)
            .toPromise()
            .then((response: any) => response as Product)
            .then((product) => {
                product.previousPrice /= 100;
                product.currentPrice /= 100;
                return product;
            });
    }

    getAllProducts(query): Promise<ListModel<Product>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());

        return this.http.get('api/v1/products', { params })
            .toPromise()
            .then((response: any) => response as ListModel<Product>)
            .then((products) => {
                products.list.forEach((product) => {
                    product.previousPrice /= 100;
                    product.currentPrice /= 100;
                    return product;
                });
                return products;
            });
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
