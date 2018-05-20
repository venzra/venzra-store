import StripeStatic = stripe.StripeStatic;

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { Order } from '../models/order';
import { Payment } from '../models/payment';

@Injectable()
export class PaymentService {

    constructor(
        private http: HttpClient
    ) { }

    preparePayment(stripeToken: string, paymentData: Card): Promise<any> {
        return Promise
            .resolve((<any>window).Stripe)
            .then((stripe: StripeStatic) => {
                stripe.setPublishableKey(stripeToken);
                return stripe;
            })
            .then((stripe: StripeStatic) => new Promise((resolve, reject) => stripe.card.createToken({
                    name: paymentData.holder,
                    number: paymentData.number,
                    exp_month: paymentData.expiryMonth,
                    exp_year: paymentData.expiryYear,
                    cvc: paymentData.verificationCheck,
                    address_line1: paymentData.address.street,
                    address_line2: paymentData.address.building,
                    address_city: paymentData.address.city,
                    address_state: paymentData.address.county,
                    address_zip: paymentData.address.postalCode,
                    address_country: 'GB'
                }, ((status, response) => {
                    switch (status) {
                        case 200:
                            resolve(response);
                            break;
                        default:
                            reject(new Error(response.error.message));
                    }
                })
            )));
    }

    checkout(token: string, paymentData: Payment): Observable<Order> {
        const cart = paymentData.cart;
        const destination = paymentData.destination;

        return this.http.post<Order>('/api/orders', { token, cart, destination });
    }

}
