import { Request, Response, NextFunction } from 'express';
import { createHash, pbkdf2Sync } from 'crypto';
import { v4 } from 'uuid';
import { encode, decode } from 'jwt-simple';

import { AccessDeniedError, AuthenticationError, NotFoundError, ValidationError } from '../middleware/error-handler';

import { ISubscriptionModel } from '../models/subscription';
import { SubscriptionService } from '../services/subscription';

import { CustomerModel, ICustomerModel, ICustomerLogin, ICustomerPassword } from '../models/customer';

import { environment } from '../config';

export class AuthenticationController {

    protected customerId: string;
    protected customer: ICustomerModel;
    protected subscription: ISubscriptionModel;

    private token: ICustomerLogin;

    constructor(
        private subscriptionService: SubscriptionService
    ) {}

    getCustomer(req: Request, res: Response, next: NextFunction) {
        const _id = this.customer.id;
        const subscription = this.subscription._id;

        CustomerModel
            .findOne({ _id, subscription })
            .select('identity status')
            .then((customer) => {
                if (!customer) {
                    return next(new NotFoundError());
                }
                return res.status(200).send(customer);
            });
    }

    checkSubscription(req: Request, res: Response, next: NextFunction) {
        this.subscriptionService.validate(req.subdomains)
            .then((subscription: ISubscriptionModel) => {
                subscription.features = subscription.addons.map((addon) => addon.name);
                this.subscription = subscription;
            })
            .then(() => next());
    }

    validate(req: Request, res: Response, next: NextFunction) {
        Promise.resolve(req.cookies.jwt)
            .then((jwt) => {
                if (!jwt) {
                    throw new AccessDeniedError('No authentication token found');
                }

                return decode(jwt, environment.secret, false, 'HS512');
            })
            .then((token) => {
                if (req.ip !== token.ip) {
                    throw new AccessDeniedError('Change of IP address detected');
                }

                return token;
            })
            .then((token) =>
                CustomerModel
                    .findOne({ _id: token._id, 'access.key': token.key })
                    .populate('subscription')
                    .then((customer: ICustomerModel) => {
                        if (!customer) {
                            res.clearCookie('jwt');
                            throw new AccessDeniedError(`Invalid customer token for ${token._id}`);
                        }

                        // TODO: Check token expiry against customer
                        this.customer = customer;
                        return next();
                    }))
            .catch((err) => next(err));
    }

    authorise(req: Request, res: Response, next: NextFunction) {
        const errors = [];

        if (!req.body.identity) {
            errors.push({ path: 'identity', kind: 'required' });
        }

        if (!req.body.password) {
            errors.push({ path: 'password', kind: 'required' });
        }

        if (errors.length) {
            return next(new ValidationError(errors));
        }

        const subscription = this.subscription._id;
        const identity = (req.body.identity).toLowerCase();

        CustomerModel.findOne({ subscription, identity })
            .then((customer: ICustomerModel) => {
                if (!customer) {
                    const salt = createHash('sha1').update(v4()).digest('hex');

                    const password: ICustomerPassword = req.body.password ? {
                        salt: salt,
                        secure: pbkdf2Sync(req.body.password, salt, 10000, 256, 'sha512').toString('base64'),
                        created: new Date()
                    } : null;

                    customer = new CustomerModel({ subscription, identity, password });
                    return customer.save();
                }
                return customer;
            })
            .then((customer: ICustomerModel) => {

                switch (customer.status) {
                    case 'ACTIVE':
                    case 'RECOVERY':
                        break;
                    case 'LOCKED':
                        // TODO: Allow for timeout on customer lock for new attempts
                        throw new AuthenticationError(customer.identity, 'Account locked');
                    default:
                        throw new AuthenticationError(customer.identity, `Account state is ${customer.status}`);
                }

                const password = pbkdf2Sync(req.body.password, customer.password.salt, 10000, 256, 'sha512').toString('base64');

                if (customer.password.secure === password) {
                    this.customerId = customer._id;
                    this.token = {
                        key: createHash('sha256').update(v4()).digest('hex').toString(),
                        ip: req.ip,
                        created: new Date()
                    };

                    const changes = {
                        $set: {
                            access: this.token,
                            lock: { failures: 0 },
                            status: 'ACTIVE'
                        }
                    };

                    return customer
                        .update(changes)
                        .exec();
                } else {
                    const changes = {
                        $unset: { access: 1 },
                        $set: {
                            'lock.ip': req.ip,
                            'lock.attempted': new Date()
                        },
                        $inc: { 'lock.failures': 1 },
                        status: (customer.lock.failures >= 4 ? 'LOCKED' : customer.status)
                    };

                    return customer
                        .update(changes)
                        .exec()
                        .then(() => {
                            throw new AuthenticationError(customer.identity, 'Password incorrect');
                        });
                }
            })
            .then(() => next())
            .catch((error) => next(error));
    }

    tokenise(req: Request, res: Response, next: NextFunction) {
        const customer = {
            _id: this.customerId,
            key: this.token.key,
            ip: this.token.ip
        };
        const encoded = encode(customer, environment.secret, 'HS512');

        res.cookie('jwt', encoded, { httpOnly: true, secure: environment.secure });
        res.status(202).send();
    }

    logout(req: Request, res: Response, next: NextFunction) {
        Promise.resolve()
            .then(() => this.customer.update({ $unset: { access: 1 } }).exec())
            .then(() => {
                res.clearCookie('jwt');
                res.status(202).send();
            });
    }
}
