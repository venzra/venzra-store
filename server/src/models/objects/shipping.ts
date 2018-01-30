import { Schema, Document } from 'mongoose';

interface IShippingModel extends Document {
    reference: string;
    name: string;
    price: number;
}

const ShippingSchema: Schema = new Schema({
    reference: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { _id: false });

export { IShippingModel, ShippingSchema };
