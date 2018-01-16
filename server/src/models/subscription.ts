import { Schema, Document, Model, model } from 'mongoose';

interface IGatewayModel {
    publicKey: string;
    privateKey: string;
}

interface ITransactionModel {
    base: number;
    rate: number;
}

interface ISubscriptionModel extends Document {
    storeName?: string;
    strapline?: string;
    domainName?: string;
    icon?: string;
    logo?: string;
    gateway?: IGatewayModel;
    transactions?: ITransactionModel;
    status?: string;
}

const TransactionSchema: Schema = new Schema({
    base: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
}, { _id: false });

const SubscriptionSchema: Schema = new Schema({
    storeName: {
        type: String,
        required: true,
        trim: true
    },
    strapline: {
        type: String,
        trim: true
    },
    domainName: {
        type: String,
        required: true,
        lowercase: true
    },
    icon: {
        type: Schema.Types.ObjectId,
        ref: 'images'
    },
    logo: {
        type: Schema.Types.ObjectId,
        ref: 'images'
    },
    gateway: {
        type: {
            publicKey: {
                type: String,
                required: true
            },
            privateKey: {
                type: String,
                required: true
            }
        }
    },
    transactions: {
        type: TransactionSchema
    },
    status: {
        type: String,
        enum: ['TRIAL', 'ACTIVE', 'INACTIVE'],
        required: true,
        default: 'TRIAL'
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

SubscriptionSchema.index({ storeName: 1 }, { unique: true });

SubscriptionSchema.pre('validate', function (next) {
    this.domainName = this.storeName.replace(/[^a-z|0-9\-\s]/gi, ' ').trim().replace(/\s+/g, '-');
    next();
});

SubscriptionSchema.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

const SubscriptionModel: Model<ISubscriptionModel> = model('subscriptions', SubscriptionSchema) as Model<ISubscriptionModel>;

export { SubscriptionModel, ISubscriptionModel };
