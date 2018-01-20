import { Schema, Document } from 'mongoose';

import { FeeSchema, IFeeModel } from './fee';

interface IPaymentModel extends Document {
    reference: string;
    transaction: string;
    card: number;
    brand: string;
    fee: IFeeModel;
    value: number;
}

const PaymentSchema: Schema = new Schema({
    reference: {
        type: String,
        required: true
    },
    transaction: {
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
        type: FeeSchema,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, { _id: false });

export { IPaymentModel, PaymentSchema };
