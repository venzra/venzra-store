import { Request, Response, NextFunction } from 'express';

import { BadRequest } from './error-handler';

import { CartModel } from '../models/cart';

import { SubscriptionService } from '../services/subscription';

const createCart = (subscription, ip) => {
    return CartModel.create({ subscription, ip });
};

export const venzraSession = (req: Request, res: Response, next: NextFunction): void => {
    const subscriptionService = new SubscriptionService();

    subscriptionService
        .validate(req.subdomains)
        .then((subscription) => {
            if (!subscription) {
                throw new BadRequest('No store available');
            }
            return subscription._id;
        })
        .then((subscription) => {
            const _id = req.cookies.vid;
            if (!_id) {
                return createCart(subscription, req.ip);
            }
            return CartModel.findOne({ _id, subscription })
                .then((cart) => {
                    if (!cart) {
                        return createCart(subscription, req.ip);
                    }
                    return cart;
                });
        })
        .then((cart) => {
            req.cookies.vid = cart._id.toString();
            res.cookie('vid', cart._id.toString());
        })
        .then(() => next())
        .catch((error) => next(error));
};
