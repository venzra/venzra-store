import { Request, Response, NextFunction, Router } from 'express';
import { encode, decode } from 'jwt-simple';

import { AuthenticationController } from './authentication';

import { SubscriptionService } from '../services/subscription';

class IdentityController extends AuthenticationController {

    constructor(private router: Router) {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post('/identity/login', this.checkSubscription.bind(this), this.authorise.bind(this), this.tokenise.bind(this));
        this.router.post('/identity/recover', this.recover.bind(this));
        this.router.post('/identity/logout', this.validate.bind(this), this.logout.bind(this));
    }

    recover(req: Request, res: Response, next: NextFunction) {
        res.status(200).send({ recovery: true });
    }

}

export { IdentityController };
