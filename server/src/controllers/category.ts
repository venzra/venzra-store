import * as parser from 'body-parser';

import { Request, Response, NextFunction, Router } from 'express';

import { AuthenticationController } from './authentication';
import { SubscriptionService } from '../services/subscription';

import { NotFoundError } from '../middleware/error-handler';

import { CategoryModel } from '../models/category';

export class CategoryController extends AuthenticationController {

    public router: Router;

    constructor() {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router = Router();
        this.router.use(parser.json({ type: 'application/json' }));

        this.router.get('/', this.checkSubscription.bind(this), this.findAll.bind(this));
        this.router.get('/:categorySlug', this.checkSubscription.bind(this), this.findOne.bind(this));
    }

    findOne(req: Request, res: Response, next: NextFunction) {
        const slug = req.params.categorySlug;
        const subscription = this.subscription._id;

        CategoryModel
            .findOne({ subscription, slug })
            .select('slug name description featureImage')
            .populate({
                path: 'parent',
                select: 'slug name featureImage'
            })
            .populate({
                path: 'children',
                select: 'slug name featureImage'
            })
            .then((category) => {
                if (!category) {
                    throw new NotFoundError();
                }
                res.status(200).send(category);
            })
            .catch((error) => next(error));
    }

    findAll(req: Request, res: Response, next: NextFunction) {
        const parent = { $eq: null };
        const subscription = this.subscription._id;

        const query: any = { subscription, parent };

        if (req.query.primary) {
            query.primary = { $eq: true };
        }

        CategoryModel.find(query)
            .select('slug name featureImage')
            .populate({
                path: 'children',
                select: 'slug name',
                options: { sort: { name: 1 } }
            })
            .sort({ name: 1 })
            .then((categories) => res.status(200).send({ list: categories }))
            .catch((error) => next(error));
    }

}

export default new CategoryController().router;
