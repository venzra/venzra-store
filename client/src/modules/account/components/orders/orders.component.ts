import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import { LayoutService } from '../../../../services/layout.service';
import { ListModel } from '../../../../services/restful.service';
import { Order, OrderService } from '../../../../services/order.service';

@Component({
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

    public orders: ListModel<Order>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderService: OrderService,
        private layout: LayoutService
    ) {
        this.route.data.subscribe((data: { orders: ListModel<Order> }) => {
            this.orders = data.orders;
        });
    }

    ngOnInit(): void {
        this.layout.title = 'Account Profile';
        this.route.queryParams.subscribe((params) => this.orderService.getAllOrders(params).then((orders) => this.orders = orders));
    }

    updatePage(pageEvent: PageEvent) {
        const skip = pageEvent.pageIndex * pageEvent.pageSize;
        const limit = pageEvent.pageSize;

        this.router.navigate(['/account/orders'], { queryParams: { skip, limit }, queryParamsHandling: 'merge', replaceUrl: true });
    }
}
