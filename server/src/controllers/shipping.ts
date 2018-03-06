import * as parser from 'body-parser';

import { Request, Response, NextFunction, Router } from 'express';

import { AuthenticationController } from './authentication';
import { SubscriptionService } from '../services/subscription';

import { ShippingModel } from '../models/shipping';

export class ShippingController extends AuthenticationController {

    public router: Router;

    constructor() {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router = Router();
        this.router.use(parser.json({ type: 'application/json' }));

        this.router.get('/', this.checkSubscription.bind(this), this.findAll.bind(this));
    }

    findAll(req: Request, res: Response, next: NextFunction) {
        const searchParams: any = { subscription: this.subscription._id };
        const order = { currentPrice: 1, shipmentTime: 1 };

        ShippingModel
            .count(searchParams).exec()
            .then((total) =>
                ShippingModel
                    .aggregate([
                        { $match: searchParams },
                        { $sort: order },
                        { $project: { displayName: 1, cartMinimum: 1, cartMaximum: 1, currentPrice: 1 } }
                    ])
                    .then((list) => res.status(200).send({ list, total }))
            )
            .catch((shippingError) => next(shippingError));
    }

}

export default new ShippingController().router;
