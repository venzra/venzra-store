import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../../../services/product.service';
import { LayoutService } from '../../../../services/layout.service';
import { CartService } from '../../../../services/cart.service';

@Component({
    selector: 'product-view',
    templateUrl: './product.component.html',
    styleUrls: ['product.component.sass']
})
export class ProductComponent implements OnInit {

    product: Product;

    constructor(
        private route: ActivatedRoute,
        private layout: LayoutService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Products';

        this.route.data.subscribe((data: { productData: Product }) => {
            this.product = data.productData;
        });
    }

    purchase(product) {
        this.cartService.addProduct(product);
    }

}
