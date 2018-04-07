import { Schema } from 'mongoose';

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;

interface ContactModel {
    companyName: string;
    email: string;
    fullName: string;
    message: string;
    phoneNumber: string;
    subject: string;
}

interface IContactModel {
    recipient: string;
    fields: string[];
}

const ContactSchema: Schema = new Schema({
    recipient: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 80,
        validate: [
            (val: string) => EMAIL_REGEX.test(val), 'Invalid email address'
        ]
    },
    fields: {
        type: [String],
        default: []
    }
}, { _id: false });

export { IContactModel, ContactSchema, ContactModel };
