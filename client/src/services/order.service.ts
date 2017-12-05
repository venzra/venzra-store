import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Order {
    reference: string;
}

@Injectable()
export class OrderService {

    constructor(
        private http: HttpClient
    ) { }

}
