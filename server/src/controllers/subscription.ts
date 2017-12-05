import { Request, Response, NextFunction, Router } from 'express';

import { AuthenticationController } from './authentication';
import { SubscriptionService } from '../services/subscription';

class SubscriptionController extends AuthenticationController {

    constructor(
        private router: Router
    ) {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/subscription', this.checkSubscription.bind(this), this.retrieve.bind(this));
    }

    retrieve(req: Request, res: Response, next: NextFunction) {
        const { _id, domainName, storeName, strapline, gateway } = this.subscription;

        return res.status(200).send({ _id, domainName, storeName, strapline, gateway: gateway.publicKey });
    }

}

export { SubscriptionController };
