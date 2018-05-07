import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ListModel } from '@venzra/services/restful.service';

import { Category } from '../models/category';

@Injectable()
export class CategoryService {

    constructor(
        private http: HttpClient
    ) { }

    findOne(categorySlug: string): Observable<Category> {
        return this.http.get<Category>(`/api/categories/${categorySlug}`);
    }

    findAll(): Observable<ListModel<Category>> {
        return this.http.get<ListModel<Category>>('/api/categories');
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
export class CategoryListResolve implements Resolve<ListModel<Category>> {
    constructor(
        private categoryService: CategoryService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListModel<Category>> {
        return this.categoryService.findAll();
    }
}
