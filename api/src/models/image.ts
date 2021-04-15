import { Schema, Document, Model, model } from 'mongoose';

export interface IImage extends Document {
	userId: string;
	partyId: string;
	link: string;
}

const imageSchema: Schema = new Schema({
    partyId: {
        type: String,
        trim: true,
        required : true,
    },
    link: {
        type: String,
        trim: true,
        required : true,
    },
});

export const Image: Model<IImage> = model('image', imageSchema);
