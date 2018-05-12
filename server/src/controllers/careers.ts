import moment = require('moment');
import * as parser from 'body-parser';

import { Request, Response, NextFunction, Router } from 'express';

import { AuthenticationController } from './authentication';

import { CareerModel } from '../models/careers';
import { SubscriptionService } from '../services/subscription';

export class CareerController extends AuthenticationController {

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
        const searchParams = { subscription: this.subscription._id, expires: { $gte: moment().startOf('day').toDate() } };
        const order = { expires: 1, position: 1 };

        CareerModel
            .count(searchParams).exec()
            .then((total) =>
                CareerModel
                    .aggregate([
                        { $match: searchParams },
                        { $sort: order },
                        { $project: { position: 1, description: 1, expires: 1 } }
                    ])
                    .then((list) => res.status(200).send({ list, total }))
            )
            .catch((error) => next(error));
    }

}

export default new CareerController().router;
