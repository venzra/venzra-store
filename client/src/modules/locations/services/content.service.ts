import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Content } from '../models/content';

@Injectable()
export class ContentService {

    constructor(
        private http: HttpClient
    ) { }

    find(page: string): Observable<Content> {
        return this.http.get<Content>(`/api/content/${page}`);
    }

}

@Injectable()
export class LocationPageResolve implements Resolve<Content> {

    constructor(
        private contentService: ContentService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Content> {
        return this.contentService.find('location');
    }

}
