import { Schema, Document, Model, model } from 'mongoose';

import { IItemModel, ItemSchema } from './objects/items';
import { IShippingModel, ShippingSchema } from './objects/shipping';
import { IAddressModel, AddressSchema } from './objects/address';
import { IPaymentModel, PaymentSchema } from './objects/payment';

interface IOrderModel extends Document {
    subscription: string;
    customer: string;
    reference: string;
    items: IItemModel[];
    shipping: IShippingModel;
    destination: IAddressModel;
    billing: IAddressModel;
    payment: IPaymentModel;
    status?: string;
}

const OrderSchema: Schema = new Schema({
    subscription: {
        type: Schema.Types.ObjectId,
        ref: 'subscriptions',
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customers',
        required: true
    },
    reference: {
        type: String,
        required: true,
        trim: true
    },
    items: {
        type: [ItemSchema],
        required: true
    },
    shipping: {
        type: ShippingSchema,
        required: true
    },
    destination: {
        type: AddressSchema,
        required: true
    },
    billing: {
        type: AddressSchema,
        required: true
    },
    payment: {
        type: PaymentSchema,
        required: true
    },
    status: {
        type: String,
        enum: ['CREATED'],
        required: true,
        default: 'CREATED'
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

OrderSchema.index({ subscription: 1, reference: 1 }, { unique: true });

const OrderModel: Model<IOrderModel> = model('orders', OrderSchema) as Model<IOrderModel>;

export { OrderModel, IOrderModel };
