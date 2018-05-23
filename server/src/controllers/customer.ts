import * as parser from 'body-parser';
import * as zxcvbn from 'zxcvbn';
import { createHash, pbkdf2Sync } from 'crypto';
import { v4 } from 'uuid';

import { NextFunction, Request, Response, Router } from 'express';

import { AuthenticationController } from './authentication';

import { ICustomerModel, ICustomerPassword } from '../models/customer';
import { SubscriptionService } from '../services/subscription';
import { ValidationError } from '../middleware/error-handler';
import { IAddressModel } from '../models/objects/address';

export class CustomerController extends AuthenticationController {

    public router: Router;

    constructor() {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router = Router();
        this.router.use(parser.json({ type: 'application/json' }));

        this.router.get('/', this.checkSubscription.bind(this), this.validate.bind(this), this.getCustomer.bind(this));
        this.router.post('/password', this.checkSubscription.bind(this), this.validate.bind(this), this.changePassword.bind(this));
        this.router.post('/addresses', this.checkSubscription.bind(this), this.validate.bind(this), this.createAddress.bind(this), this.getCustomer.bind(this));
        this.router.delete('/addresses/:addressId', this.checkSubscription.bind(this), this.validate.bind(this), this.removeAddress.bind(this));
    }

    changePassword(req: Request, res: Response, next: NextFunction) {
        const errors = [];

        if (!req.body.password) {
            errors.push({ path: 'password', kind: 'required' });
        } else {
            const { score } = zxcvbn(req.body.password);
            if (score < 3) {
                errors.push({ path: 'password', kind: 'strength' });
            }
        }

        if (req.body.password !== req.body.confirmation) {
            errors.push({ path: 'confirmation', kind: 'invalid' });
        }

        if (errors.length) {
            return next(new ValidationError(errors));
        }

        const passwordCheck = pbkdf2Sync(req.body.current, this.customer.password.salt, 10000, 256, 'sha512').toString('base64');

        if (passwordCheck === this.customer.password.secure) {
            const salt = createHash('sha1').update(v4()).digest('hex');

            const password: ICustomerPassword = {
                salt: salt,
                secure: pbkdf2Sync(req.body.password, salt, 10000, 256, 'sha512').toString('base64'),
                created: new Date()
            };

            this.customer.set('password', password);

            this.customer.save()
                .then(() => res.status(202).send())
                .catch((error) => next(error));
        } else {
            next(new ValidationError([{ path: 'current', kind: 'invalid' }]));
        }
    }

    createAddress(req: Request, res: Response, next: NextFunction) {
        const address = {
            addressee: req.body.addressee,
            street: req.body.street,
            building: req.body.building,
            city: req.body.city,
            county: req.body.county,
            country: req.body.country,
            postalCode: req.body.postalCode
        };

        this.customer.addresses.push(<IAddressModel>address);

        this.customer.save()
            .then((customer: ICustomerModel) => {
                if (customer.addresses.length === 1) {
                    customer.primaryAddress = customer.addresses[0]._id;
                    return customer.save();
                } else if (!customer.primaryAddress || req.body.makeDefault) {
                    customer.primaryAddress = customer.addresses[customer.addresses.length - 1]._id;
                    return customer.save();
                }
            })
            .then(() => next())
            .catch((error) => next(error));
    }

    removeAddress(req: Request, res: Response, next: NextFunction) {
        const addresses = this.customer.addresses.filter((address) => address.get('_id', 'string') !== req.params.addressId);
        const changes: any = { $pull: { addresses: { _id: req.params.addressId } } };

        if (addresses.length === 0) {
            changes.$unset = { primaryAddress: 1 };
        } else if (!this.customer.primaryAddress || this.customer.get('primaryAddress', 'string') === req.params.addressId) {
            changes.$set = { primaryAddress: addresses[0]._id };
        }

        this.customer.update(changes)
            .exec()
            .then(() => res.status(202).send())
            .catch((error) => next(error));
    }

}

export default new CustomerController().router;
