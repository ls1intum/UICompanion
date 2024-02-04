import { Model, model } from 'mongoose'
import {issueMetadataSchema, IIssueMetadata} from "@repo/shared";

export const IssueMetadataModel: Model<IIssueMetadata> = model<IIssueMetadata>('IIssueMetadata', issueMetadataSchema);

