import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { Product } from '../models/product';

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    getProduct(productSlug: string): Promise<Product> {
        return this.http.get<Product>(`/api/products/${productSlug}`).toPromise();
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
