import { Request, Response, NextFunction, Router } from 'express';

import { SubscriptionService } from '../services/subscription';

class SubscriptionController extends SubscriptionService {

    constructor(
        private router: Router
    ) {
        super();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/subscription', this.validate.bind(this), this.retrieve.bind(this));
    }

    retrieve(req: Request, res: Response, next: NextFunction) {
        return res.status(200).send(this.subscription);
    }

}

export { SubscriptionController };
