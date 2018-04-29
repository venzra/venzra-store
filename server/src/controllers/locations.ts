import * as parser from 'body-parser';

import { Request, Response, NextFunction, Router } from 'express';

import { AuthenticationController } from './authentication';

import { LocationModel } from '../models/locations';
import { SubscriptionService } from '../services/subscription';

export class LocationController extends AuthenticationController {

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
        const searchParams = { subscription: this.subscription._id };
        const order = { displayName: 1 };

        LocationModel
            .count(searchParams).exec()
            .then((total) =>
                LocationModel
                    .aggregate([
                        { $match: searchParams },
                        { $sort: order },
                        { $project: { displayName: 1, description: 1, address: 1, featureImage: 1, usage: 1 } }
                    ])
                    .then((list) => res.status(200).send({ list, total }))
            )
            .catch((error) => next(error));
    }

}

export default new LocationController().router;
