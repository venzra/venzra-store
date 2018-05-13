import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ListModel } from './restful.service';

import { Category } from '../models/category';

@Injectable()
export class CategoryService {

    constructor(
        private http: HttpClient
    ) { }

    findAll(query: any = {}): Observable<ListModel<Category>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());
        return this.http.get<ListModel<Category>>('/api/categories', { params });
    }

}

@Injectable()
export class CategoryListResolve implements Resolve<ListModel<Category>> {
    constructor(
        private categoryService: CategoryService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListModel<Category>> {
        return this.categoryService.findAll({ primary: true });
    }
}
