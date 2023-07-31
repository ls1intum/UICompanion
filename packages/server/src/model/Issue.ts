import { Document, Schema, Model, model, Error } from 'mongoose'

export interface IIssue extends Document {
    title: string;
    description: string;
    status: string;
}

const issueSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['open', 'closed'],
    },
});

export const Issue: Model<IIssue> = model<IIssue>('Issue', issueSchema);