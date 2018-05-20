import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';

import { Address } from '../models/address';
import { Customer } from '../models/customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(
        private http: HttpClient
    ) { }

    getCustomer(): Observable<Customer> {
        return this.http.get<Customer>('/api/customer');
    }

    createAddress(address: Address): Observable<Customer> {
        return this.http.post<Customer>('/api/customer/addresses', address);
    }

}

@Injectable({
    providedIn: 'root'
})
export class CustomerResolve implements Resolve<Customer> {
    constructor(
        private customerService: CustomerService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer> {
        return this.customerService.getCustomer();
    }
}
