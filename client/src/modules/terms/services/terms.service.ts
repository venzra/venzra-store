import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Terms } from '../models/terms';

import 'rxjs/add/operator/toPromise';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class TermsService {

    constructor(
        private http: HttpClient
    ) { }

    find(): Promise<Terms> {
        return this.http.get<Terms>('/api/content/terms').toPromise();
    }

}

@Injectable()
export class TermsPageResolve implements Resolve<Terms> {

    constructor(
        private termsService: TermsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Terms> {
        return this.termsService.find();
    }

}
