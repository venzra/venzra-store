import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ListModel } from '../../../services/restful.service';
import { Product } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'product-promotions',
    templateUrl: './promotions.component.html'
})
export class PromotionsComponent implements OnInit {

    products: ListModel<Product>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe((data: { products: ListModel<Product> }) => {
            this.products = data.products;
        });
    }

    show(product) {
        this.router.navigate([`browse/product/${product.slug}`])
    }

    purchase(product) {
        this.cartService.addProduct(product);
    }
}
