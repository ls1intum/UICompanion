import { Document, Schema, Model, model, Error } from 'mongoose'

export interface IIssue extends Document {
    number: number;
    title: string;
    description: string;
    status: string;
    frames: string[];
}

const issueSchema = new Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'In Progress', 'In Review', 'Approved'],
    },
    frames: {
        type: [String],
        required: true,
    },
});

export const Issue: Model<IIssue> = model<IIssue>('Issue', issueSchema);