import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { List } from '@venzra/models';

import { Career } from '../models/career';

@Injectable()
export class CareerService {

    constructor(
        private http: HttpClient
    ) { }

    findAll(): Observable<List<Career>> {
        return this.http.get<List<Career>>('/store/careers');
    }

}

@Injectable()
export class CareerListResolve implements Resolve<List<Career>> {

    constructor(
        private careerService: CareerService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<List<Career>> {
        return this.careerService.findAll();
    }

}
