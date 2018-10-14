import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Content } from '../models/content';

@Injectable()
export class ContentService {

    constructor(
        private http: HttpClient
    ) { }

    get(): Observable<Content> {
        return this.http.get<Content>('/store/content/contact');
    }

}

@Injectable()
export class ContentRetrieveResolve implements Resolve<Content> {

    constructor(
        private contentService: ContentService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Content> {
        return this.contentService.get();
    }

}
