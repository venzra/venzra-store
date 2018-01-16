import * as parser from 'body-parser';
import * as stream from 'stream';

import { Request, Response, NextFunction, Router } from 'express';
import { S3 } from 'aws-sdk';

import { AuthenticationController } from './authentication';

import { SubscriptionService } from '../services/subscription';
import { ImageModel } from '../models/images';

import { environment } from '../config';

export class ImagesController extends AuthenticationController {

    private awsClient: S3;

    public router: Router;

    constructor() {
        super(new SubscriptionService());
        this.awsClient = new S3({ region: 'eu-west-1' });
        this.registerRoutes();
    }

    registerRoutes() {
        this.router = Router();
        this.router.use(parser.json({ type: 'application/json' }));

        this.router.get('/:imageId', this.checkSubscription.bind(this), this.findOne.bind(this));
    }

    findOne(req: Request, res: Response, next: NextFunction) {
        ImageModel
            .findOne({ _id: req.params.imageId, subscription: this.subscription._id })
            .select('_id name usage size')
            .then((image) =>
                Promise.resolve()
                    .then(() => {
                        const Bucket = environment.imageBucket;
                        const Key = `${this.subscription._id}/${image.usage}/${image._id}`;

                        const params = { Bucket, Key };

                        return this.awsClient.headObject(params).promise();
                    })
                    .then((meta) => res.setHeader('content-type', meta.ContentType))
                    .then(() => {
                        const Bucket = environment.imageBucket;
                        const Key = `${this.subscription._id}/${image.usage}/${image._id}`;

                        const params = { Bucket, Key };

                        return this.awsClient.getObject(params).createReadStream();
                    })
                    .then((result: stream.Readable) => result.pipe(res))
            )
            .catch((error) => next(error));
    }

}

export default new ImagesController().router;
