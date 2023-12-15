import {Octokit} from "@octokit/core";
import {Endpoints} from "@octokit/types";

export type getIssuesResponseType = Endpoints['GET /repos/{owner}/{repo}/issues']["response"];
export type getIssueByNumberResponseType = Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}']["response"];
export type updateIssueResponseType = Endpoints['PATCH /repos/{owner}/{repo}/issues/{issue_number}']["response"];

const octokit = new Octokit({ auth: <AUTH_TOKEN> });

export async function getIssues(): Promise<getIssuesResponseType['data']> {
    try {
        // TODO: Make owner and repo dynamic
        const response = await octokit.request('GET /repos/bgeisb/UICompanion-Test/issues', {
            owner: 'OWNER',
            repo: 'REPO',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getIssueByNumber(issueNumber: number): Promise<getIssueByNumberResponseType['data']> {
    try {
        // TODO: Make owner and repo dynamic
        const response = await octokit.request('GET /repos/bgeisb/UICompanion-Test/issues/{issue_number}', {
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            issue_number: issueNumber,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

interface UpdateIssueOptions {
    title?: string;
    body?: string;
    assignees?: string[];
    milestone?: number;
    state?: 'open' | 'closed';
    labels?: string[];
}

export async function updateIssue(
    issueNumber: number,
    options: UpdateIssueOptions
): Promise<updateIssueResponseType["data"]> {
    try {
        // TODO: Make owner and repo dynamic
        const response = await octokit.request('PATCH /repos/bgeisb/UICompanion-Test/issues/{issue_number}', {
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            issue_number: issueNumber,
            ...options,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
