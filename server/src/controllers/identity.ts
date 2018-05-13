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
        this.router.post('/logout', this.checkJwt.bind(this), this.validate.bind(this), this.logout.bind(this));
    }

    checkJwt(req: Request, res: Response, next: NextFunction) {
        if (req.cookies.jwt) {
            return next();
        }
        res.status(202).send();
    }

    logout(req: Request, res: Response, next: NextFunction) {
        this.customer
            .update({ $unset: { access: 1 } })
            .then(() => {
                res.clearCookie('jwt');
                res.status(202).send();
            });
    }

}

export default new IdentityController().router;
