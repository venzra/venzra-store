import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Product } from '../models/product';

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    findOne(productSlug: string): Observable<Product> {
        return this.http.get<Product>(`/store/products/${productSlug}`);
    }
}

@Injectable()
export class ProductRetrieveResolve implements Resolve<Product> {
    constructor(
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        return this.productService.findOne(route.params.product);
    }
}
