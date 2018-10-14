import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { List } from '@venzra/models';

import { Location } from '../models/location';

@Injectable()
export class LocationService {

    constructor(
        private http: HttpClient
    ) { }

    findAll(): Observable<List<Location>> {
        return this.http.get<List<Location>>('/store/locations');
    }

}

@Injectable()
export class LocationListResolve implements Resolve<List<Location>> {

    constructor(
        private locationService: LocationService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<List<Location>> {
        return this.locationService.findAll();
    }

}
