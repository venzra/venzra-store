import * as parser from 'body-parser';

import { Request, Response, NextFunction, Router } from 'express';

import { AuthenticationController } from './authentication';

import { SubscriptionService } from '../services/subscription';

export class IdentityController extends AuthenticationController {

    public router: Router;

    constructor() {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router = Router();
        this.router.use(parser.json({ type: 'application/json' }));

        this.router.post('/login', this.checkSubscription.bind(this), this.authorise.bind(this), this.tokenise.bind(this));
        this.router.post('/recover', this.recover.bind(this));
        this.router.post('/logout', this.validate.bind(this), this.logout.bind(this));
    }

    recover(req: Request, res: Response, next: NextFunction) {
        res.status(200).send({ recovery: true });
    }

}

export default new IdentityController().router;
