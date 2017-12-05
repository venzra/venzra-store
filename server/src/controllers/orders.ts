import { Request, Response, NextFunction, Router } from 'express';
import * as Stripe from 'stripe';

import { AuthenticationController } from './authentication';
import { SubscriptionService } from '../services/subscription';

import { BadRequest, NotFoundError, ThirdPartyError, ValidationError } from '../middleware/error-handler';

import { IOrderModel, OrderModel } from '../models/orders';
import { CartModel } from '../models/cart';
import { email, mailer } from '../services/mailer';

class OrdersController extends AuthenticationController {

    constructor(private router: Router) {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post('/orders', this.checkSubscription.bind(this), this.validate.bind(this), this.createOrder.bind(this), this.findOne.bind(this));
    }

    createOrder(req: Request, res: Response, next: NextFunction) {

        let errors = [];

        if (!req.body.cart) {
            errors.push({ path: 'cart', kind: 'required' });
        }

        if (!req.body.shipping) {
            errors.push({ path: 'shipping', kind: 'required' });
        }

        if (!req.body.destination) {
            errors.push({ path: 'destination', kind: 'required' });
        }

        if (!req.body.billing) {
            errors.push({ path: 'billing', kind: 'required' });
        }

        if (!req.body.token || !req.body.token.id) {
            errors.push({ path: 'token', kind: 'required' });
        }

        if (errors.length) {
            return next(new ValidationError(errors));
        }

        const gatewayKey = this.subscription.gateway.privateKey;
        const stripe = new Stripe(gatewayKey);

        req.body.billing.country = 'GB';
        req.body.destination.country = 'GB';

        CartModel.findOne({ _id: req.body.cart, subscription: this.subscription._id })
            .populate({
                path: 'items.product'
            })
            .then((cart) => {
                if (!cart) {
                    throw new BadRequest('Invalid cart reference');
                }

                const charge = cart.items.reduce((total, item) => total + (item.quantity * item.product.currentPrice), 0);
                const fee = Math.round(charge * this.subscription.transactions.rate) + this.subscription.transactions.base;

                return stripe.charges
                    .create({
                        amount: charge,
                        currency: 'gbp',
                        application_fee: fee,
                        source: req.body.token.id,
                        shipping: {
                            name: req.body.shipping.addressee,
                            address: {
                                line1: req.body.shipping.street,
                                line2: req.body.shipping.building,
                                city: req.body.shipping.city,
                                state: req.body.shipping.county,
                                postal_code: req.body.shipping.postalCode
                            }
                        },
                        statement_descriptor: this.subscription.storeName.substr(0, 22)
                    })
                    .then((payment) => {
                        const order = new OrderModel({
                            subscription: this.subscription,
                            customer: this.customer,
                            reference: Math.floor((Math.random() * 0.9 + 0.1) * Math.pow(10, 10)),
                            items: cart.items.map((item) => { return { product: item.product, quantity: item.quantity, price: item.product.currentPrice }; }),
                            shipping: req.body.shipping,
                            destination: req.body.destination,
                            billing: req.body.billing,
                            payment: {
                                reference: payment.id,
                                fee: fee,
                                value: charge
                            }
                        });

                        return order.save()
                            .then((result) => req.params.orderId = result._id)
                            .then(() => cart.update({ $set: { items: [] } }).exec())
                            .then(() => order)
                            .catch((orderError) => next(orderError));
                    })
                    .then((order: IOrderModel) => mailer.send(this.subscription, 'Order confirmation', this.customer, email.orderConfirmation(this.subscription, order)))
                    .then(() => next())
                    .catch((err) => next(new ThirdPartyError(err.type, err.message)));
            })
            .catch((err) => next(err));

    }

    findOne(req: Request, res: Response, next: NextFunction) {
        const _id = req.params.orderId;
        const subscription = this.subscription._id;

        OrderModel
            .findOne({ _id, subscription })
            .select('reference')
            .then((order) => order ? res.status(200).send(order) : next(new NotFoundError()));
    }

}

export { OrdersController };
