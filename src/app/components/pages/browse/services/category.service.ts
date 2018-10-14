import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { List } from '@venzra/models';

import { Category } from '../models/category';

@Injectable()
export class CategoryService {

    constructor(
        private http: HttpClient
    ) { }

    findOne(categorySlug: string): Observable<Category> {
        return this.http.get<Category>(`/store/categories/${categorySlug}`);
    }

    findAll(): Observable<List<Category>> {
        return this.http.get<List<Category>>('/store/categories');
    }

}

@Injectable()
export class CategoryRetrieveResolve implements Resolve<Category> {
    constructor(
        private categoryService: CategoryService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> {
        return this.categoryService.findOne(route.params.category);
    }
}

@Injectable()
export class CategoryListResolve implements Resolve<List<Category>> {
    constructor(
        private categoryService: CategoryService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<List<Category>> {
        return this.categoryService.findAll();
    }
}
