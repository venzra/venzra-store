import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../../../services/product.service';
import { LayoutService } from '../../../../services/layout.service';
import { CartService } from '../../../../services/cart.service';

@Component({
    selector: 'product-view',
    templateUrl: './product.component.html',
    styleUrls: ['product.component.scss']
})
export class ProductComponent implements OnInit {

    public featureImage;
    public product: Product;

    constructor(
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private layout: LayoutService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Products';

        this.route.data.subscribe((data: { productData: Product }) => {
            this.product = data.productData;

            if (data.productData.featureImage) {
                this.featureImage = this.sanitizer.bypassSecurityTrustStyle(`url(/api/images/${data.productData.featureImage})`);
            }
        });
    }

    purchase(product) {
        this.cartService.addProduct(product);
    }

}
