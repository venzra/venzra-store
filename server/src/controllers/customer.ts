import { Router } from 'express';

import { AuthenticationController } from './authentication';

import { SubscriptionService } from '../services/subscription';

class CustomerController extends AuthenticationController {

    constructor(private router: Router) {
        super(new SubscriptionService());
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/customer', this.checkSubscription.bind(this), this.validate.bind(this), this.getCustomer.bind(this));
    }

}

export { CustomerController };
