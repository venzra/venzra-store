import { Schema, Document, Model, model } from 'mongoose';

interface IProductModel extends Document {
    subscription?: string;
    code: string;
    displayName: string;
    previousPrice: number;
    currentPrice: number;
    status?: string;
}

const ProductSchema: Schema = new Schema({
    subscription: {
        type: Schema.Types.ObjectId,
        ref: 'subscriptions',
        required: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    featureImage: {
        type: Schema.Types.ObjectId,
        ref: 'images'
    },
    promotionalImage: {
        type: Schema.Types.ObjectId,
        ref: 'images',
        required: true
    },
    previousPrice: {
        type: Number,
        min: 0,
        default: 0
    },
    currentPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        required: true,
        default: 'INACTIVE'
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

ProductSchema.index({ subscription: 1, code: 1 }, { unique: true });
ProductSchema.index({ subscription: 1, slug: 1 }, { unique: true });

const ProductModel: Model<IProductModel> = model('products', ProductSchema) as Model<IProductModel>;

export { ProductModel, IProductModel };
