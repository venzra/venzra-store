import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { Category } from '../models/category';
import { ListModel } from '@venzra/services/restful.service';

@Injectable()
export class CategoryService {

    constructor(
        private http: HttpClient
    ) { }

    findOne(categorySlug: string): Promise<Category> {
        return this.http.get<Category>(`/api/categories/${categorySlug}`).toPromise();
    }

    findAll(): Promise<ListModel<Category>> {
        return this.http.get<ListModel<Category>>('/api/categories').toPromise();
    }

}

@Injectable()
export class CategoryRetrieveResolve implements Resolve<Category> {
    constructor(
        private categoryService: CategoryService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Category> {
        return this.categoryService.findOne(route.params.category);
    }
}

@Injectable()
export class CategoryListResolve implements Resolve<ListModel<Category>> {
    constructor(
        private categoryService: CategoryService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ListModel<Category>> {
        return this.categoryService.findAll();
    }
}
