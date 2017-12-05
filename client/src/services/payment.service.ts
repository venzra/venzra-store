import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Order } from './order.service';

import 'rxjs/add/operator/toPromise';

export class Card {
    holder: string;
    number: number;
    expiryMonth: number;
    expiryYear: number;
    verificationCheck: number;
}

export class Address {
    addressee: string;
    building: string;
    street: string;
    city: string;
    county: string;
    postalCode: string;
}

export class Payment {
    cart: string;
    card: Card;
    billing: Address;
    destination: Address;
}

@Injectable()
export class PaymentService {

    constructor(
        private http: HttpClient
    ) { }

    checkout(stripeToken: string, paymentData: Payment): Promise<Order> {
        const cart = paymentData.cart;
        const card = paymentData.card;
        const shipping = { value: 500 };
        const destination = paymentData.destination;
        const billing = paymentData.billing;

        return Promise
            .resolve((<any>window).Stripe)
            .then((stripe) => {
                stripe.setPublishableKey(stripeToken);
                return stripe;
            })
            .then((stripe) => new Promise((resolve, reject) => stripe.card.createToken({
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
            .then((token) =>
                this.http.post('api/v1/orders', { cart, shipping, token, destination, billing })
                    .toPromise()
                    .catch(() => {
                        throw new Error('Unable to place order, please contact us or try again later');
                    })
            )
            .then((order) => order as Order);
    }

}
