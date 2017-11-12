import { Request, Response, NextFunction, Router } from 'express';

import { AuthenticationController } from './authentication';

import { SubscriptionService } from '../services/subscription';

import { CartModel, ICart } from '../models/cart';
import { IRestOperation } from '../models/rest';
import { IProductModel, ProductModel } from '../models/products';

class CartController extends AuthenticationController {

    constructor(private router: Router) {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/cart', this.checkSubscription.bind(this), this.findOne.bind(this));
        this.router.patch('/cart', this.checkSubscription.bind(this), this.updateBasket.bind(this), this.findOne.bind(this));
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
            .select('items')
            .populate({
                path: 'items.product',
                select: 'displayName storePrice',
                match: { status: 'ACTIVE' }
            })
            .then((cart) => <ICart>cart.toObject())
            .then((cart) => {
                const items = cart.items.filter((item) => item.product);
                const value = items.reduce((value, item) => value + (item.quantity * (<IProductModel>item.product).storePrice), 0);
                return { ...cart, items, value };
            })
            .then((cart) => res.status(200).send(cart));
    }

}

export { CartController };
