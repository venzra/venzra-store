import { Schema, Document, Model, model } from 'mongoose';
import { ISubscriptionModel } from './subscription';

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;

interface ICustomerPassword {
    salt: string;
    secure: string;
    created: Date;
}

interface ICustomerLogin {
    key: string;
    ip: string;
    created: Date;
}

interface ICustomerFailure {
    failures: number;
    ip?: string;
    updated?: Date;
}

interface ICustomerModel extends Document {
    subscription?: ISubscriptionModel;
    identity?: string;
    password?: ICustomerPassword;
    access?: ICustomerLogin;
    lock?: ICustomerFailure;
    status?: string;
}

const CustomerSchema: Schema = new Schema({
    subscription: {
        type: Schema.Types.ObjectId,
        ref: 'subscriptions'
    },
    identity: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: [
            (val: string) => EMAIL_REGEX.test(val), 'Invalid email address'
        ]
    },
    password: {
        type: {
            salt: {
                type: String,
                required: true
            },
            secure: {
                type: String,
                required: true
            },
            created: {
                type: Date,
                required: true
            }
        },
        required: true
    },
    access: {
        type: {
            key: {
                type: String,
                required: true
            },
            ip: {
                type: String,
                required: true
            },
            created: {
                type: Date,
                required: true
            }
        }
    },
    lock: {
        type: {
            failures: {
                type: Number,
                required: true
            },
            ip: {
                type: String
            },
            updated: {
                type: Date
            }
        },
        default: { failures: 0 }
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'RECOVERY', 'LOCKED'],
        required: true,
        default: 'ACTIVE'
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

CustomerSchema.index({ subscription: 1, identity: 1 }, { unique: true });

CustomerSchema.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

const CustomerModel: Model<ICustomerModel> = model('customers', CustomerSchema) as Model<ICustomerModel>;

export { CustomerModel, ICustomerModel, ICustomerPassword, ICustomerLogin };
