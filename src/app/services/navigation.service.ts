import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { NavigationSection } from '@venzra/models';

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
