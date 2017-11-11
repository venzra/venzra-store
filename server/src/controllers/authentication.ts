import { Request, Response, NextFunction } from 'express';

import { ISubscriptionModel } from '../models/subscription';
import { SubscriptionService } from '../services/subscription';

export class AuthenticationController {

    subscription: ISubscriptionModel;

    constructor(
        private subscriptionService: SubscriptionService
    ) {}

    checkSubscription(req: Request, res: Response, next: NextFunction) {
        this.subscriptionService.validate(req.subdomains)
            .then((subscription: ISubscriptionModel) => this.subscription = subscription)
            .then(() => next());
    }
}
