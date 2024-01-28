"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueMetadataModel = void 0;
const mongoose_1 = require("mongoose");
const issueMetadataSchema = new mongoose_1.Schema({
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
exports.IssueMetadataModel = (0, mongoose_1.model)('IIssueMetadata', issueMetadataSchema);
