import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Account, Address, Cart, List, Subscription } from '@venzra/models';
import { AccountService, CartService, LayoutService, SubscriptionService } from '@venzra/services';
import { AddressCreateDialogComponent } from '@venzra/components/layout/addresses/create-dialog.component';

import { Order } from '../../models/order';
import { Shipping } from '../../models/shipping';
import { Payment } from '../../models/payment';
import { CalendarService } from '../../services/calendar.service';
import { PaymentService } from '../../services/payment.service';

@Component({
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

    public subscription: Subscription;
    public addresses: Array<Address>;
    public shippingData: List<Shipping>;
    public order: Order = { reference: '' };
    public cart: Cart;

    public saving = false;
    public completed = false;
    public destinationForm: FormGroup;
    public shippingForm: FormGroup;
    public paymentForm: FormGroup;
    public months = [];
    public years = [];

    private cardToken: string;

    constructor(
        private route: ActivatedRoute,
        private forms: FormBuilder,
        private layout: LayoutService,
        private dialog: MatDialog,
        private snackbar: MatSnackBar,
        private accountService: AccountService,
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

        const account = this.accountService.getAccount().getValue();
        const selectedAddress = account.addresses.find((address) => address._id === account.primaryAddress);
        this.addresses = account.addresses;
        this.shippingData = this.route.snapshot.data.shippingData;

        this.destinationForm = this.forms.group({
            address: [selectedAddress, [Validators.required]]
        });

        this.shippingForm = this.forms.group({
            shipping: [null, [Validators.required]]
        });

        this.paymentForm = this.forms.group({
            holder: [null, [Validators.required, Validators.maxLength(80)]],
            address: [selectedAddress, [Validators.required]],
            number: [null, [Validators.required]],
            expiryMonth: [null, [Validators.required]],
            expiryYear: [null, [Validators.required]],
            verificationCheck: [null, [Validators.required]]
        });

        this.paymentForm.get('address').valueChanges.subscribe((value) => this.paymentForm.get('holder').setValue(value.addressee));

        this.subscriptionService.getSubscription().subscribe((subscription) => this.subscription = subscription);
        this.cartService.getCart().subscribe((cart) => this.cart = cart);
    }

    createAddress() {
        this.dialog
            .open(AddressCreateDialogComponent, { width: '90%', maxWidth: '640px', disableClose: true })
            .afterClosed()
            .subscribe((account: Account) => {
                if (account) {
                    this.addresses = account.addresses;
                }
            });
    }

    selectAddress(address: Address) {
        this.destinationForm.get('address').setValue(address);
        this.paymentForm.get('address').setValue(address);
    }

    selectShipping(shipping: Shipping) {
        this.shippingForm.get('shipping').setValue(shipping._id);
    }

    selectBilling(address: Address) {
        this.paymentForm.get('address').setValue(address);
    }

    validatePayment(stepper) {
        this.saving = true;

        const payment = this.paymentForm.getRawValue();

        this.paymentService
            .preparePayment(this.subscription.gateway, payment)
            .then((card) => {
                this.cardToken = card;
                stepper.selectedIndex++;
            })
            .catch((error) => this.snackbar.open(error.message || 'Payment failed', 'OK', { duration: 5000 }))
            .then(() => this.saving = false);
    }

    performCheckout(stepper) {
        this.saving = true;

        const shipping = this.shippingForm.get('shipping').value;
        const destination = this.destinationForm.get('address').value._id;

        const payment: Payment = { shipping, destination };

        this.paymentService
            .checkout(this.cardToken, payment)
            .subscribe((order) => {
                this.order = order;
                this.cartService.loadCart();
                stepper.selectedIndex++;
                this.completed = true;
            }, (error) => {
                this.snackbar.open(error.message || 'Order placement failed', 'OK', { duration: 5000 });
                this.saving = false;
            });
    }

}
