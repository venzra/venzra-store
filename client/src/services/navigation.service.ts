import { Injectable } from '@angular/core';

import { NavigationSection } from '@venzra/models/navigation-section';

import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/do';

@Injectable()
export class NavigationService {

    public displayNavigation: Subject<boolean> = new Subject<boolean>();

    private currentNavigation: Subject<Array<NavigationSection>> = new Subject<Array<NavigationSection>>();

    getNavigation(): Subject<Array<NavigationSection>> {
        return this.currentNavigation;
    }

    setFilter(filter: Array<NavigationSection>) {
        this.currentNavigation.next(filter);
    }

}
