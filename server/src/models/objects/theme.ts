import { Schema, Document } from 'mongoose';

interface IThemeModel extends Document {
    color: string;
}

const ThemeSchema: Schema = new Schema({
    color: {
        type: String,
        required: true
    }
}, { _id: false });

export { IThemeModel, ThemeSchema };
