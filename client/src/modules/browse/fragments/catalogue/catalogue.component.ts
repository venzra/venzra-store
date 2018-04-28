import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListModel } from '@venzra/services/restful.service';
import { NavigationService } from '@venzra/services/navigation.service';

import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
    templateUrl: './catalogue.component.html'
})
export class CatalogueComponent implements OnInit, OnDestroy {

    public catalogues: ListModel<Category>;

    constructor(
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private navigationService: NavigationService
    ) { }

    ngOnInit(): void {
        this.catalogues = this.route.snapshot.data.catalogueData;

        this.navigationService.displayNavigation.next(true);

        this.navigationService.setFilter(this.catalogues.list.map((category) => ({ name: category.name, icon: 'apps', link: `/browse/category/${category.slug}`, items: category.children.map((child) => ({ name: child.name, link: `/browse/category/${child.slug}` })) })));
    }

    ngOnDestroy(): void {
        this.navigationService.displayNavigation.next(false);
    }

}
