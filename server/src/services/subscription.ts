import { Request, Response, NextFunction } from 'express';

import { ISubscriptionModel, SubscriptionModel } from '../models/subscription';

export class SubscriptionService {

    subscription: ISubscriptionModel;

    validate(req: Request, res: Response, next: NextFunction) {
        const domainName = req.subdomains.pop();

        SubscriptionModel
            .findOne({ domainName })
            .then((subscription) => this.subscription = subscription)
            .then(() => next());
    }
}
