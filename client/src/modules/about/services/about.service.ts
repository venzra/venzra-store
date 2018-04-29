import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { About } from '@venzra/modules/about/models/about';

import 'rxjs/add/operator/toPromise';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AboutService {

    constructor(
        private http: HttpClient
    ) { }

    find(): Promise<About> {
        return this.http.get<About>('/api/content/about').toPromise();
    }

}

@Injectable()
export class AboutPageResolve implements Resolve<About> {

    constructor(
        private aboutService: AboutService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<About> {
        return this.aboutService.find();
    }

}
