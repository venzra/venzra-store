import * as parser from 'body-parser';
import * as zxcvbn from 'zxcvbn';

import { Request, Response, Router } from 'express';

import { AuthenticationController } from './authentication';

import { SubscriptionService } from '../services/subscription';

export class ValidationController extends AuthenticationController {

    public router: Router;

    constructor() {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router = Router();
        this.router.use(parser.json({ type: 'application/json' }));

        this.router.post('/password', this.checkSubscription.bind(this), this.validatePassword.bind(this));
    }

    validatePassword(req: Request, res: Response) {
        const { score, feedback } = zxcvbn(req.body.password || '');

        const message = feedback.warning ? feedback.warning : feedback.suggestions[0];

        res.status(200).send({ score, message });
    }

}

export default new ValidationController().router;
