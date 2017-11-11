import { ISubscriptionModel, SubscriptionModel } from '../models/subscription';

export class SubscriptionService {

    subscription: ISubscriptionModel;

    validate(domains) {
        const domainName = domains.pop();

        return SubscriptionModel
            .findOne({ domainName })
    }
}
