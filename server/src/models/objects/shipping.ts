import { Schema, Document } from 'mongoose';

interface IShippingModel extends Document {
    price: number;
}

const ShippingSchema: Schema = new Schema({
    price: {
        type: Number,
        required: true,
        default: 500
    }
}, { _id: false });

export { IShippingModel, ShippingSchema };
