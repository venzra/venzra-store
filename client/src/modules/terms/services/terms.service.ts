import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Terms } from '../models/terms';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class TermsService {

    constructor(
        private http: HttpClient
    ) { }

    find(): Observable<Terms> {
        return this.http.get<Terms>('/api/content/terms');
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
