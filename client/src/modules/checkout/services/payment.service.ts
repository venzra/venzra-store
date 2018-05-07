import StripeStatic = stripe.StripeStatic;

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Order } from '../models/order';
import { Payment } from '../models/payment';

@Injectable()
export class PaymentService {

    constructor(
        private http: HttpClient
    ) { }

    checkout(stripeToken: string, paymentData: Payment): Promise<Observable<Order>> {
        const cart = paymentData.cart;
        const card = paymentData.card;
        const shipping = { value: 500 };
        const destination = paymentData.destination;
        const billing = paymentData.billing;

        return Promise
            .resolve((<any>window).Stripe)
            .then((stripe: StripeStatic) => {
                stripe.setPublishableKey(stripeToken);
                return stripe;
            })
            .then((stripe: StripeStatic) => new Promise((resolve, reject) => stripe.card.createToken({
                    name: card.holder,
                    number: card.number,
                    exp_month: card.expiryMonth,
                    exp_year: card.expiryYear,
                    cvc: card.verificationCheck,
                    address_line1: billing.building,
                    address_line2: billing.street,
                    address_city: billing.city,
                    address_state: billing.county,
                    address_zip: billing.postalCode,
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
            )))
            .then((token) => this.http.post<Order>('/api/orders', { cart, shipping, token, destination, billing }));
    }

}
