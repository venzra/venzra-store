import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Category, List } from '@venzra/models';

@Injectable()
export class CategoryService {

    constructor(
        private http: HttpClient
    ) { }

    findAll(query: any = {}): Observable<List<Category>> {
        const params = Object.keys(query).reduce((httpParams, key) => httpParams.set(key, query[key]), new HttpParams());
        return this.http.get<List<Category>>('/store/categories', { params });
    }

}

@Injectable()
export class CategoryListResolve implements Resolve<List<Category>> {
    constructor(
        private categoryService: CategoryService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<List<Category>> {
        return this.categoryService.findAll({ primary: true });
    }
}
