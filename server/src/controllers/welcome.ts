import * as ejs from 'ejs';
import * as parser from 'body-parser';
import * as path from 'path';

import { Request, Response, NextFunction, Router } from 'express';

import { AuthenticationController } from './authentication';
import { SubscriptionService } from '../services/subscription';

export class WelcomeController extends AuthenticationController {

    public router: Router;

    constructor() {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router = Router();
        this.router.use(parser.json({ type: 'application/json' }));

        this.router.get('*', this.checkSubscription.bind(this), this.retrieve.bind(this));
    }

    retrieve(req: Request, res: Response, next: NextFunction) {
        if (req.url.startsWith('/assets') || req.url.endsWith('.js')) {
            return next();
        }

        const data = {
            title: this.subscription.storeName,
            description: this.subscription.strapline || 'Welcome to our online store',
            theme: this.subscription.theme || {}
        };

        ejs.renderFile(path.join(__dirname, '../../client/index.html'), data, (err, html) => {
            if (err) {
                return next(err);
            }

            res.status(200).send(html);
        });
    }

}

export default new WelcomeController().router;
