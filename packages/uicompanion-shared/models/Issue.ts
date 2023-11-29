import { Document, Schema } from 'mongoose'

export interface Issue {
    repository_url: string;
    number: number;
    title: string;
    description: string;
    status: string;
    frames: string[];
    prototypeUrls: string[];
}

export interface IIssue extends Document {
    repository_url: string;
    number: number;
    title: string;
    description: string;
    status: string;
    frames: string[];
    prototypeUrls: string[];
}

export const issueSchema = new Schema({
    repository_url: {
        type: String,
        required: true,
    },
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
    prototypeUrls: {
        type: [String],
        required: true,
    },
});