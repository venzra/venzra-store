import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { About } from '@venzra/modules/about/models/about';

@Injectable()
export class AboutService {

    constructor(
        private http: HttpClient
    ) { }

    find(): Observable<About> {
        return this.http.get<About>('/api/content/about');
    }

}

@Injectable()
export class AboutPageResolve implements Resolve<About> {

    constructor(
        private aboutService: AboutService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<About> {
        return this.aboutService.find();
    }

}
