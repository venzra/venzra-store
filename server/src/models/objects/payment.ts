import { Schema, Document } from 'mongoose';

interface IPaymentModel extends Document {
    reference: string;
    card: number;
    value: number;
}

const PaymentSchema: Schema = new Schema({
    reference: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    card: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, { _id: false });

export { IPaymentModel, PaymentSchema };
