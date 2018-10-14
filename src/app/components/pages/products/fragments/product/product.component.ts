import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { CartService, LayoutService } from '@venzra/services';

import { Product } from '../../models/product';

import { environment } from '../../../../../../environments/environment';

@Component({
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
        this.route.data.subscribe((data: { productData: Product }) => {
            this.product = data.productData;
            this.layout.title = this.product.displayName;

            if (data.productData.featureImage) {
                this.featureImage = this.sanitizer.bypassSecurityTrustStyle(`url(${environment.apiUri}/store/images/${data.productData.featureImage})`);
            }
        });
    }

    purchase(product) {
        this.cartService.addProduct(product);
    }

}
