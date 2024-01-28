import { Schema, Model, model } from 'mongoose'
import {IIssueMetadata} from "@repo/shared";


const issueMetadataSchema = new Schema({
    repository_url: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    progress: {
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

export const IssueMetadataModel: Model<IIssueMetadata> = model<IIssueMetadata>('IIssueMetadata', issueMetadataSchema);

