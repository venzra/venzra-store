import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ListModel } from '@venzra/services/restful.service';

import { Location } from '../models/location';

@Injectable()
export class LocationService {

    constructor(
        private http: HttpClient
    ) { }

    findAll(): Observable<ListModel<Location>> {
        return this.http.get<ListModel<Location>>('/api/locations');
    }

}

@Injectable()
export class LocationListResolve implements Resolve<ListModel<Location>> {

    constructor(
        private locationService: LocationService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListModel<Location>> {
        return this.locationService.findAll();
    }

}
