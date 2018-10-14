import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import { List } from '@venzra/models';
import { LayoutService } from '@venzra/services';

import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

    public orders: List<Order>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderService: OrderService,
        private layout: LayoutService
    ) { }

    ngOnInit(): void {
        this.layout.title = 'Order history';
        this.orders = this.route.snapshot.data.orders;

        this.route.queryParams.subscribe((params) => this.orderService.getAllOrders(params).subscribe((orders) => this.orders = orders));
    }

    updatePage(pageEvent: PageEvent) {
        const skip = pageEvent.pageIndex * pageEvent.pageSize;
        const limit = pageEvent.pageSize;

        this.router.navigate(['/account/orders'], { queryParams: { skip, limit }, queryParamsHandling: 'merge', replaceUrl: true });
    }
}
