import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ListModel } from '@venzra/services/restful.service';

import { Career } from '../models/career';

@Injectable()
export class CareerService {

    constructor(
        private http: HttpClient
    ) { }

    findAll(): Observable<ListModel<Career>> {
        return this.http.get<ListModel<Career>>('/api/careers');
    }

}

@Injectable()
export class CareerListResolve implements Resolve<ListModel<Career>> {

    constructor(
        private careerService: CareerService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListModel<Career>> {
        return this.careerService.findAll();
    }

}
