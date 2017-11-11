import { Request, Response, NextFunction, Router } from 'express';

import { AuthenticationController } from './authentication';
import { SubscriptionService } from '../services/subscription';

import { NotFoundError } from '../middleware/error-handler';

import { ProductModel } from '../models/products';

class ProductsController extends AuthenticationController {

    constructor(private router: Router) {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/products', this.checkSubscription.bind(this), this.findAll.bind(this));
        this.router.get('/products/:productSlug', this.checkSubscription.bind(this), this.findOne.bind(this));
    }

    findOne(req: Request, res: Response, next: NextFunction) {
        const slug = req.params.productSlug;
        const subscription = this.subscription._id;
        const status = 'ACTIVE';

        ProductModel
            .findOne({ slug, subscription, status })
            .select('slug code displayName retailPrice storePrice')
            .populate({
                path: 'history.account',
                select: 'identity'
            })
            .then((product) => product ? res.status(200).send(product) : next(new NotFoundError()));
    }

    findAll(req: Request, res: Response, next: NextFunction) {
        const searchParams: any = { subscription: this.subscription._id, status: 'ACTIVE' };
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 25;
        const order = { displayName: 1 };

        if (req.query.search) {
            searchParams.displayName = new RegExp(req.query.search, 'i');
        }

        ProductModel
            .count(searchParams).exec()
            .then((total) =>
                ProductModel
                    .aggregate([
                        { $match: searchParams },
                        { $sort: order },
                        { $skip: skip },
                        { $limit: limit },
                        { $project: { slug: 1, code: 1, displayName: 1, storePrice: 1 } }
                    ])
                    .then((list) => res.status(200).send({ list, total, skip, limit }))
            )
            .catch((productError) => next(productError));
    }

}

export { ProductsController };
