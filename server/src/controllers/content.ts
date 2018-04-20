import * as parser from 'body-parser';

import { Request, Response, NextFunction, Router } from 'express';

import { NotFoundError } from '../middleware/error-handler';

import { ContentModel } from '../models/content';
import { SubscriptionService } from '../services/subscription';
import { AuthenticationController } from './authentication';

import { defaultTerms } from '../default-terms';

export class ContentController extends AuthenticationController {

    public router: Router;

    constructor() {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router = Router();
        this.router.use(parser.json({ type: 'application/json' }));

        this.router.get('/:contentUsage', this.checkSubscription.bind(this), this.getContent.bind(this));
    }

    getContent(req: Request, res: Response, next: NextFunction) {
        const subscription = this.subscription._id;
        const usage = req.params.contentUsage;

        ContentModel.findOne({ subscription, usage })
            .select('content')
            .then((content) => {
                if (!content) {
                    if (usage === 'terms') {
                        return res.status(200).send({ content: defaultTerms });
                    }

                    throw new NotFoundError();
                }

                res.status(200).send(content);
            })
            .catch((error) => next(error));
    }
}

export default new ContentController().router;
