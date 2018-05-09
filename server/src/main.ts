import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as path from 'path';

import { AddressInfo } from 'net';
import { venzraSession } from './middleware/venzra-session';

import CartController from './controllers/cart';
import CategoryController from './controllers/category';
import ContentController from './controllers/content';
import ContactController from './controllers/contact';
import CustomerController from './controllers/customer';
import IdentityController from './controllers/identity';
import ImagesController from './controllers/images';
import LocationsController from './controllers/locations';
import OrdersController from './controllers/orders';
import ProductsController from './controllers/products';
import ShippingController from './controllers/shipping';
import SubscriptionController from './controllers/subscription';
import ValidationController from './controllers/validation';
import WelcomeController from './controllers/welcome';

import { errorHandler } from './middleware/error-handler';

require('mongoose').Promise = global.Promise;

/*
 * Database connection
 */
const mongo = {
    uri: process.env['DB_URI'],
    options: {
        socketTimeoutMS: 0,
        keepAlive: 120,
        reconnectTries: 30,
        poolSize: 5
    }
};

mongoose
    .connect(mongo.uri, mongo.options)
    .catch((err) => console.error(`Mongo connection error: ${err.message}`));

/*
 * Configure security elements
 */
const app: express.Application = express();
app.enable('trust proxy');
app.use(helmet());
app.use(cookieParser());
app.use(venzraSession);

/*
 * Register routing endpoints
 */
app.use('/api', morgan(':remote-addr - BASIC LOG - [:date[iso]] - ":method :url" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'));

app.use('/api/cart', CartController);
app.use('/api/categories', CategoryController);
app.use('/api/content', ContentController);
app.use('/api/contact', ContactController);
app.use('/api/customer', CustomerController);
app.use('/api/identity', IdentityController);
app.use('/api/images', ImagesController);
app.use('/api/locations', LocationsController);
app.use('/api/orders', OrdersController);
app.use('/api/products', ProductsController);
app.use('/api/shipping', ShippingController);
app.use('/api/subscription', SubscriptionController);
app.use('/api/validation', ValidationController);

app.use(WelcomeController);

app.use(express.static(path.join(__dirname, '../client')));

app.use(errorHandler);

/*
 * Create the server
 */
const server = http.createServer(app);
const port = process.env['PORT'];

server.listen(port);
server.on('listening', listening);

function listening() {
    const addr = <AddressInfo>server.address();
    console.log(`Listening on ${addr.address}:${addr.port}`);
}

module.exports = app;
