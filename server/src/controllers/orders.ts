import * as parser from 'body-parser';

import { Request, Response, NextFunction, Router } from 'express';
import * as Stripe from 'stripe';

import { AuthenticationController } from './authentication';
import { SubscriptionService } from '../services/subscription';

import { BadRequest, NotFoundError, ThirdPartyError, ValidationError } from '../middleware/error-handler';

import { IOrderModel, OrderModel } from '../models/orders';
import { CartModel } from '../models/cart';
import { ProductModel } from '../models/products';
import { email, mailer } from '../services/mailer';

import { environment } from '../config';

export class OrdersController extends AuthenticationController {

    public router: Router;

    constructor() {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router = Router();
        this.router.use(parser.json({ type: 'application/json' }));

        this.router.get('/', this.checkSubscription.bind(this), this.validate.bind(this), this.findAll.bind(this));
        this.router.post('/', this.checkSubscription.bind(this), this.validate.bind(this), this.createOrder.bind(this), this.findOne.bind(this));
    }

    createOrder(req: Request, res: Response, next: NextFunction) {
        const errors = [];
        const destination = this.customer.addresses.find((address) => address.id === req.body.destination);

        if (!req.body.cart) {
            errors.push({ path: 'cart', kind: 'required' });
        }

        if (!destination) {
            errors.push({ path: 'destination', kind: 'required' });
        }

        if (!req.body.token || !req.body.token.id) {
            errors.push({ path: 'token', kind: 'required' });
        }

        if (errors.length) {
            return next(new ValidationError(errors));
        }
        const gatewayKey = this.subscription.gateway.privateKey;
        const stripe = new Stripe(gatewayKey);

        CartModel.findOne({ _id: req.body.cart, subscription: this.subscription._id })
            .populate({
                path: 'items.product'
            })
            .then((cart) => {
                if (!cart) {
                    throw new BadRequest('Invalid cart reference');
                }

                const postage = cart.shipping.price;
                const charge = cart.items.reduce((total, item) => total + (item.quantity * item.product.currentPrice), postage);
                const fee = Math.round(charge * this.subscription.transactions.rate) + this.subscription.transactions.base;

                return stripe.charges
                    .create({
                        amount: charge,
                        currency: 'gbp',
                        application_fee: fee,
                        source: req.body.token.id,
                        shipping: {
                            name: destination.addressee,
                            address: {
                                line1: destination.street,
                                line2: destination.building,
                                city: destination.city,
                                state: destination.county,
                                postal_code: destination.postalCode
                            }
                        },
                        statement_descriptor: this.subscription.storeName.substr(0, 22)
                    })
                    .then((payment) => stripe.balance.retrieveTransaction(<string> payment.balance_transaction).then((transaction) => ({ payment, transaction })))
                    .then(({ payment, transaction }) => {
                        const order = new OrderModel({
                            subscription: this.subscription,
                            customer: this.customer,
                            reference: Math.floor((Math.random() * 0.9 + 0.1) * Math.pow(10, 10)),
                            items: cart.items.map((item) => ({ product: item.product, quantity: item.quantity, price: item.product.currentPrice })),
                            shipping: cart.shipping,
                            destination: destination,
                            billing: {
                                addressee: payment.source.name,
                                street: payment.source.address_line1,
                                building: payment.source.address_line2,
                                city: payment.source.address_city,
                                county: payment.source.address_state,
                                country: payment.source.address_country,
                                postalCode: payment.source.address_zip
                            },
                            payment: {
                                reference: payment.id,
                                transaction: transaction.id,
                                name: payment.source.name,
                                card: payment.source.last4,
                                brand: payment.source.brand,
                                fee: {
                                    venzra: (({ amount, currency }) => ({ amount, currency }))(transaction.fee_details.find((part) => part.type === 'application_fee')),
                                    gateway: (({ amount, currency }) => ({ amount, currency }))(transaction.fee_details.find((part) => part.type === 'stripe_fee')),
                                    total: transaction.fee
                                },
                                value: payment.amount
                            }
                        });

                        return order.save()
                            .then((result) => req.params.orderId = result._id)
                            .then(() => cart.update({ $set: { items: [] } }).exec())
                            .then(() => order)
                            .catch((orderError) => next(orderError));
                    })
                    .then((order: IOrderModel) => {
                        const sender = `${this.subscription.storeName} <${this.subscription.domainName}@${environment.emailDomain}>`;
                        const message = email.orderConfirmation(this.subscription, order);
                        return mailer.send('Order confirmation', this.customer.get('identity'), message, sender);
                    })
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

    findAll(req: Request, res: Response, next: NextFunction) {
        const searchParams: any = { subscription: this.subscription._id, customer: this.customer._id };
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 5;
        const order = { created: -1 };

        OrderModel
            .count(searchParams).exec()
            .then((total) =>
                OrderModel
                    .aggregate([
                        { $match: searchParams },
                        { $sort: order },
                        { $skip: skip },
                        { $limit: limit },
                        { $project: { reference: 1, shipping: 1, destination: 1, payment: { name: 1, card: 1, brand: 1, value: 1 }, items: 1, status: 1, created: 1 } }
                    ])
                    .then((result) => ProductModel.populate(result, { path: 'items.product', select: '-_id slug displayName status' }))
                    .then((list) => res.status(200).send({ list, total, skip, limit }))
            )
            .catch((productError) => next(productError));
    }

}

export default new OrdersController().router;
