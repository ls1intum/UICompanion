import { Context, Probot } from 'probot';
import { Issue } from "@octokit/webhooks-types";
export declare function persistIssue(app: Probot, issue: Issue, probotContext: Context): Promise<void>;
