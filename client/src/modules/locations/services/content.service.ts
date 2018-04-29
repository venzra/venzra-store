import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { Content } from '../models/content';

@Injectable()
export class ContentService {

    constructor(
        private http: HttpClient
    ) { }

    find(page: string): Promise<Content> {
        return this.http.get<Content>(`/api/content/${page}`).toPromise();
    }

}

@Injectable()
export class LocationPageResolve implements Resolve<Content> {

    constructor(
        private contentService: ContentService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Content> {
        return this.contentService.find('location');
    }

}
