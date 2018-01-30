import * as parser from 'body-parser';

import { Request, Response, NextFunction, Router } from 'express';

import { AuthenticationController } from './authentication';

import { SubscriptionService } from '../services/subscription';

import { CartModel, ICartModel } from '../models/cart';
import { IRestOperation } from '../models/rest';
import { IProductModel, ProductModel } from '../models/products';
import { IShippingModel, ShippingModel } from '../models/shipping';

export class CartController extends AuthenticationController {

    public router: Router;

    constructor() {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router = Router();
        this.router.use(parser.json({ type: 'application/json' }));

        this.router.get('/', this.checkSubscription.bind(this), this.findOne.bind(this));
        this.router.patch('/', this.checkSubscription.bind(this), this.updateBasket.bind(this), this.findOne.bind(this));
    }

    updateBasket(req: Request, res: Response, next: NextFunction) {
        const _id = req.cookies.vid;
        const subscription = this.subscription._id;

        CartModel
            .findOne({ _id, subscription })
            .then((cart) => {
                if (req.body instanceof Array === false) {
                    return;
                }

                let promise = Promise.resolve();

                (<Array<IRestOperation>>req.body).forEach((operation) => {
                    switch (operation.op) {
                        case 'add':
                            switch (operation.path) {
                                case 'product':
                                    promise = promise
                                        .then(() => ProductModel.findOne({ _id: operation.value, subscription, status: 'ACTIVE' }))
                                        .then((product) => {
                                            if (!product) {
                                                return;
                                            }

                                            const item = cart.items.find((entry) => entry.product.toString() === product._id.toString());

                                            if (item) {
                                                item.quantity++;
                                            } else {
                                                cart.items.push({ product: product._id });
                                            }

                                            cart.set('shipping', undefined);
                                        });
                            }
                            break;
                        case 'replace':
                            switch (operation.path) {
                                case 'shipping':
                                    promise = promise
                                        .then(() => ShippingModel.findOne({ _id: operation.value, subscription }))
                                        .then((shipping: IShippingModel) => {
                                            if (!shipping) {
                                                return;
                                            }

                                            cart.set('shipping', { reference: shipping._id, name: shipping.displayName, price: shipping.currentPrice });
                                        });
                            }
                            break;
                        case 'remove':
                            switch (operation.path) {
                                case 'product':
                                    promise = promise
                                        .then(() => {
                                            const item = cart.items.find((entry) => entry.product.toString() === operation.value);

                                            if (!item) {
                                                return;
                                            }

                                            item.quantity--;

                                            if (item.quantity <= 0) {
                                                cart.items = cart.items.filter((entry) => entry.product.toString() !== operation.value);
                                            }

                                            cart.set('shipping', undefined);
                                        });
                            }
                    }
                });

                return promise.then(() => cart.save());
            })
            .then(() => next())
            .catch((error) => next(error));
    }

    findOne(req: Request, res: Response, next: NextFunction) {
        const _id = req.cookies.vid;
        const subscription = this.subscription._id;

        CartModel
            .findOne({ _id, subscription })
            .select('items shipping')
            .populate({
                path: 'items.product',
                select: 'displayName promotionalImage currentPrice',
                match: { status: 'ACTIVE' }
            })
            .then((cart) => <ICartModel>cart.toObject())
            .then((cart) => {
                const items = cart.items.filter((item) => item.product);
                const value = items.reduce((total, item) => total + (item.quantity * (<IProductModel>item.product).currentPrice), 0);
                return { ...cart, items, value };
            })
            .then((cart) => res.status(200).send(cart));
    }

}

export default new CartController().router;
