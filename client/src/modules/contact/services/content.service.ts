import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Content } from '../models/content';

@Injectable()
export class ContentService {

    constructor(
        private http: HttpClient
    ) { }

    get(): Promise<Content> {
        return this.http.get<Content>('/api/content/contact').toPromise();
    }

}

@Injectable()
export class ContentRetrieveResolve implements Resolve<Content> {

    constructor(
        private contentService: ContentService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Content> {
        return this.contentService.get();
    }

}
