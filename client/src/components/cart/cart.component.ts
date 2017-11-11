import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'shopping-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
    }
}
