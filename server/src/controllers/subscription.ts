import * as parser from 'body-parser';

import { Request, Response, NextFunction, Router } from 'express';

import { AuthenticationController } from './authentication';
import { SubscriptionService } from '../services/subscription';

export class SubscriptionController extends AuthenticationController {

    public router: Router;

    constructor() {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router = Router();
        this.router.use(parser.json({ type: 'application/json' }));

        this.router.get('/', this.checkSubscription.bind(this), this.retrieve.bind(this));
    }

    retrieve(req: Request, res: Response, next: NextFunction) {
        const { _id, domainName, storeName, strapline, icon, logo, gateway } = this.subscription;

        return res.status(200).send({ _id, domainName, storeName, strapline, icon, logo, gateway: gateway ? gateway.publicKey : '' });
    }

}

export default new SubscriptionController().router;
