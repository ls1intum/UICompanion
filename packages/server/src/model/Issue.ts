import { Model, model } from "mongoose";
import { IIssue, issueSchema } from "@ls1intum/uicompanion-shared/models/Issue";

export const Issue: Model<IIssue> = model<IIssue>('Issue', issueSchema); 