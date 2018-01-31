import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'venzra-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {

    @Input() product;

    constructor(
        private router: Router
    ) { }

    show(product) {
        this.router.navigate([`browse/product/${product.slug}`]);
    }
}
