import { Component, Input } from '@angular/core';

@Component({
    selector: 'venzra-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {

    @Input() public product;

}
