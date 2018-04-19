import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Subscription } from '@venzra/models/subscription';

import { Cart } from '@venzra/models/cart';
import { CartService } from '@venzra/services/cart.service';
import { LayoutService } from '@venzra/layout/services/layout.service';
import { SubscriptionService } from '@venzra/services/subscription.service';

import { Address } from '../../models/address';
import { Card } from '../../models/card';
import { Order } from '../../models/order';
import { Payment } from '../../models/payment';

import { CalendarService } from '../../services/calendar.service';
import { PaymentService } from '../../services/payment.service';

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
            addressee: [null, [Validators.required, Validators.maxLength(80)]],
            street: [null, [Validators.required, Validators.maxLength(50)]],
            building: [null, [Validators.maxLength(50)]],
            city: [null, [Validators.maxLength(50)]],
            county: [null, [Validators.required, Validators.maxLength(50)]],
            postalCode: [null, [Validators.required, Validators.maxLength(12)]]
        });

        this.billingForm = this.forms.group({
            addressee: [null, [Validators.required, Validators.maxLength(80)]],
            street: [null, [Validators.required, Validators.maxLength(50)]],
            building: [null, [Validators.maxLength(50)]],
            city: [null, [Validators.maxLength(50)]],
            county: [null, [Validators.required, Validators.maxLength(50)]],
            postalCode: [null, [Validators.required, Validators.maxLength(12)]]
        });

        this.paymentForm = this.forms.group({
            holder: [null, [Validators.required, Validators.maxLength(80)]],
            number: [null, [Validators.required]],
            expiryMonth: [null, [Validators.required]],
            expiryYear: [null, [Validators.required]],
            verificationCheck: [null, [Validators.required]]
        });

        this.subscriptionService.getSubscription().subscribe((subscription) => this.subscription = subscription);
        this.cartService.getCart().subscribe((cart) => this.cart = cart);
    }

    toggleShipping(event) {
        const controls = this.shippingForm.controls;

        Object.keys(controls).forEach((key) => {
            controls[key].reset(event.checked ? this.billingForm.get(key).value : '');
            controls[key][event.checked ? 'disable' : 'enable']();
        });
    }

    performCheckout(stepper) {
        this.saving = true;

        const cart = this.cart._id;
        const card = <Card>this.paymentForm.getRawValue();
        const destination = <Address>this.shippingForm.getRawValue();
        const billing = <Address>this.billingForm.getRawValue();

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
