import * as parser from 'body-parser';

import { Request, Response, NextFunction, Router } from 'express';

import { AuthenticationController } from './authentication';
import { SubscriptionService } from '../services/subscription';

import { email, mailer } from '../services/mailer';
import { environment } from '../config';
import { ValidationError } from '../middleware/error-handler';

export class ContactController extends AuthenticationController {

    public router: Router;

    constructor() {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router = Router();
        this.router.use(parser.json({ type: 'application/json' }));

        this.router.post('/', this.checkSubscription.bind(this), this.sendMessage.bind(this));
    }

    sendMessage(req: Request, res: Response, next: NextFunction) {
        const errors = [];

        if (!req.body.fullName) {
            errors.push({ path: 'fullName', kind: 'required' });
        }

        if (!req.body.email) {
            errors.push({ path: 'email', kind: 'required' });
        }

        if (!req.body.message) {
            errors.push({ path: 'message', kind: 'required' });
        }

        if (errors.length) {
            return next(new ValidationError(errors));
        }

        const subject = req.body.subject || 'Web Contact';
        const sender = `${this.subscription.storeName} <${this.subscription.domainName}@${environment.emailDomain}>`;
        const message = email.contactMessage(this.subscription, req.body);

        return mailer.send(subject, this.subscription.contact.recipient, message, sender)
            .then(() => res.status(202).send())
            .catch((error) => next(error));
    }

}

export default new ContactController().router;
