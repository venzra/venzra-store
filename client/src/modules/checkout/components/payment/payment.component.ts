import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { LayoutService } from '../../../../services/layout.service';
import { Subscription, SubscriptionService } from '../../../../services/subscription.service';
import { Cart, CartService } from '../../../../services/cart.service';
import { Address, Card, Payment, PaymentService } from '../../../../services/payment.service';
import { Order } from '../../../../services/order.service';
import { CalendarService } from '../../../../services/calendar.service';

@Component({
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

    public subscription: Subscription;
    public order: Order = { reference: '' };
    public cart: Cart;

    public saving = false;
    public completed = false;
    public shippingForm: FormGroup;
    public billingForm: FormGroup;
    public paymentForm: FormGroup;
    public months = [];
    public years = [];

    constructor(
        private forms: FormBuilder,
        private layout: LayoutService,
        private snackbar: MatSnackBar,
        private subscriptionService: SubscriptionService,
        private cartService: CartService,
        private paymentService: PaymentService,
        private calendarService: CalendarService
    ) {
        this.months = this.calendarService.getMonths();
        this.years = this.calendarService.generateYears(20, 20);
    }

    ngOnInit(): void {
        this.layout.title = 'Checkout';

        this.shippingForm = this.forms.group({
            addressee: ['', [Validators.required]],
            street: ['', [Validators.required]],
            building: ['', []],
            city: ['', []],
            county: ['', [Validators.required]],
            postalCode: ['', [Validators.required]]
        });

        this.billingForm = this.forms.group({
            addressee: ['', [Validators.required]],
            street: ['', [Validators.required]],
            building: ['', []],
            city: ['', []],
            county: ['', [Validators.required]],
            postalCode: ['', [Validators.required]]
        });

        this.paymentForm = this.forms.group({
            holder: ['', [Validators.required]],
            number: ['', [Validators.required]],
            expiryMonth: ['', [Validators.required]],
            expiryYear: ['', [Validators.required]],
            verificationCheck: ['', [Validators.required]]
        });

        this.subscriptionService.getSubscription().subscribe((subscription) => this.subscription = subscription);
        this.cartService.getCart().subscribe((cart) => this.cart = cart);
    }

    toggleBilling(event) {
        const controls = this.billingForm.controls;
        Object.keys(controls).forEach((key) => {
            controls[key].reset(event.checked ? this.shippingForm.get(key).value : '');
            controls[key][event.checked ? 'disable' : 'enable']();
        });
    }

    performCheckout(stepper) {
        this.saving = true;

        const cart = this.cart._id;
        const card = this.paymentForm.getRawValue() as Card;
        const destination = this.shippingForm.getRawValue() as Address;
        const billing = this.billingForm.getRawValue() as Address;

        const payment: Payment = { cart, card, destination, billing };

        this.paymentService
            .checkout(this.subscription.gateway, payment)
            .then((order) => this.order = order)
            .then(() => this.cartService.loadCart())
            .then(() => stepper.selectedIndex++)
            .then(() => this.completed = true)
            .catch((error) => this.snackbar.open(error.message || 'Payment failed', 'OK', { duration: 5000 }))
            .then(() => this.saving = false);
    }

}
