import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavigationService } from '@venzra/services/navigation.service';
import { ListModel } from '@venzra/services/restful.service';

import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
    templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit, OnDestroy {

    public category: Category;
    public products: ListModel<Product>;

    constructor(
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private productService: ProductService,
        private navigationService: NavigationService
    ) { }

    ngOnInit(): void {
        const catalogue: ListModel<Category> = this.route.snapshot.data.catalogueData;
        this.category = this.route.snapshot.data.categoryData;
        this.products = this.route.snapshot.data.productData;

        this.route.params.subscribe((params) => {
            this.categoryService.findOne(params.category).subscribe((category) => this.category = category);
            this.productService.findAll(params).subscribe((products) => this.products = products);
        });

        this.navigationService.displayNavigation.next(true);

        this.navigationService.setFilter(catalogue.list.map((category) => ({ name: category.name, icon: 'apps', link: `/browse/category/${category.slug}`, items: category.children.map((child) => ({ name: child.name, link: `/browse/category/${child.slug}` })) })));
    }

    ngOnDestroy(): void {
        this.navigationService.displayNavigation.next(false);
    }

}
