import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { ListModel } from '@venzra/services/restful.service';

import 'rxjs/add/operator/toPromise';

import { Location } from '../models/location';

@Injectable()
export class LocationService {

    constructor(
        private http: HttpClient
    ) { }

    findAll(): Promise<ListModel<Location>> {
        return this.http.get<ListModel<Location>>('/api/locations').toPromise();
    }

}

@Injectable()
export class LocationListResolve implements Resolve<ListModel<Location>> {

    constructor(
        private locationService: LocationService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ListModel<Location>> {
        return this.locationService.findAll();
    }

}
