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
                            items: cart.items.map((item) => ({ product: item.product, quantity: item.quantity, price: item.product.currentPrice })),
                            shipping: req.body.shipping,
                            destination: req.body.destination,
                            billing: req.body.billing,
                            payment: {
                                reference: payment.id,
                                name: payment.source.name,
                                card: payment.source.last4,
                                brand: payment.source.brand,
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
