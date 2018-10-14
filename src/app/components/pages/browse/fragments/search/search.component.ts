import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { List } from '@venzra/models';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    public products: List<Product>;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.products = this.route.snapshot.data.productData;

        this.route.queryParams.subscribe((params) => this.productService.findAll(params).subscribe((products) => this.products = products));
    }

}
