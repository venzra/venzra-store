import { Schema, Document } from 'mongoose';

interface IPaymentModel extends Document {
    reference: string;
    value: number;
}

const PaymentSchema: Schema = new Schema({
    reference: {
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
