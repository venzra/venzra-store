import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ListModel } from './restful.service';

export class Product {
    _id?: string;
    code: string;
    displayName: string;
    retailPrice: number;
    storePrice: number;
}

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    getAllProducts(query): Promise<ListModel<Product>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());

        return this.http.get('api/v1/products', { params })
            .toPromise()
            .then((response: any) => response as ListModel<Product>)
            .then((products) => {
                products.list.forEach((product) => {
                    product.retailPrice /= 100;
                    product.storePrice /= 100;
                    return product;
                });
                return products;
            });
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
