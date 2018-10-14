import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Terms } from '../models/terms';

@Injectable()
export class TermsService {

    constructor(
        private http: HttpClient
    ) { }

    find(): Observable<Terms> {
        return this.http.get<Terms>('/store/content/terms');
    }

}

@Injectable()
export class TermsPageResolve implements Resolve<Terms> {

    constructor(
        private termsService: TermsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Terms> {
        return this.termsService.find();
    }

}
