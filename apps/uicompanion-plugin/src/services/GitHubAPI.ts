import {Octokit} from "@octokit/core";
import {Endpoints, OctokitResponse} from "@octokit/types";

export type GetIssuesResponseType = Endpoints['GET /repos/{owner}/{repo}/issues']["response"];
export type GetIssueByNumberResponseType = Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}']["response"];
export type UpdateIssueResponseType = Endpoints['PATCH /repos/{owner}/{repo}/issues/{issue_number}']["response"];
export type GetUserResponseType = Endpoints['GET /user']["response"];
export type GetOrganizationsResponseType = Endpoints['GET /user/memberships/orgs']["response"];

export interface GetReposResponse {
    userRepos: string[];
    orgRepos: { [orgName: string]: string[] };
}

/**
 * Interface for the options that can be updated for an issue.
 */
interface UpdateIssueOptions {
    title?: string;
    body?: string;
    assignees?: string[];
    milestone?: number;
    state?: 'open' | 'closed';
    labels?: string[];
}

/**
 * Class for interacting with the GitHub API using the Octokit library.
 * This class is designed as a singleton.
 */
class GitHubAPI {
    private static instance: GitHubAPI;
    private octokit: Octokit;

    /**
     * Private constructor to prevent direct instantiation.
     * @param {string} authToken - The authentication token.
     */
    private constructor(authToken: string) {
        this.octokit = new Octokit({ auth: authToken });
    }

    /**
     * Method to get the singleton instance of the GitHubAPI class.
     * @param {string} authToken - The authentication token.
     * @returns {GitHubAPI} The singleton instance of the GitHubAPI class.
     */
    public static getInstance(authToken: string): GitHubAPI {
        if (!GitHubAPI.instance) {
            GitHubAPI.instance = new GitHubAPI(authToken);
        }
        return GitHubAPI.instance;
    }

    /**
     * Method to get the user details of the authenticated user.
     * @returns {Promise<GetUserResponseType['data']>} A promise that resolves to the data of the response.
     */
    public async getUser(): Promise<GetUserResponseType['data']> {
        try {
            const response = await this.octokit.request('GET /user');
            return response.data;
        } catch (error: string | any) {
            throw new Error(error);
        }
    }

    /**
     * Method to get all repositories for a given user.
     * @param username - The username for which to get the repositories.
     * @param organizations - The organizations for which to get the repositories.
     * @returns {Promise<GetReposResponse>} A promise that resolves to the data of the response.
     */
    public async getRepos(username: string, organizations: string[]): Promise<GetReposResponse> {
        try {
            const userResponse = await this.octokit.request('GET /search/repositories', {
                q: `user:${username}`,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            const userRepos: string[] = userResponse.data.items.map((repo: any) => repo.name);

            const orgReposPromises = organizations.map(async (org) => {
                const orgResponse = await this.octokit.request('GET /search/repositories', {
                    q: `org:${org}`,
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                });
                return { org, repos: orgResponse.data.items.map((repo: any) => repo.name) };
            });

            const orgReposResults = await Promise.all(orgReposPromises);

            let orgRepos: { [orgName: string]: string[] } = {};
            orgReposResults.forEach((result) => {
                orgRepos[result.org] = result.repos;
            });

            console.log('All Repos:', { userRepos, orgRepos })
            return { userRepos, orgRepos };
        } catch (error: string | any) {
            throw new Error(error.message);
        }
    }

    /**
     * Method to get all organizations for the authenticated user.
     * @returns {Promise<GetOrganizationsResponseType['data']>} A promise that resolves to the data of the response.
     */
    public async getOrganizations(): Promise<GetOrganizationsResponseType['data']> {
        try {
            const response = await this.octokit.request('GET /user/memberships/orgs', {
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });

            return response.data;
        } catch (error: string | any) {
            throw new Error(error);
        }
    }

    /**
     * Method to get all issues for a given repository.
     * @param {string} owner - The owner of the repository.
     * @param {string} repo - The name of the repository.
     * @returns {Promise<GetIssuesResponseType['data']>} A promise that resolves to the data of the response.
     */
    public async getIssues(owner: string, repo: string): Promise<GetIssuesResponseType['data']> {
        try {
            const response = await this.octokit.request('GET /repos/{owner}/{repo}/issues', {
                owner,
                repo,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            return response.data;
        } catch (error: string | any) {
            throw new Error(error);
        }
    }

    /**
     * Method to get a specific issue by its number from a given repository.
     * @param {string} owner - The owner of the repository.
     * @param {string} repo - The name of the repository.
     * @param {number} issueNumber - The number of the issue.
     * @returns {Promise<GetIssueByNumberResponseType['data']>} A promise that resolves to the data of the response.
     */
    public async getIssueByNumber(owner: string, repo: string, issueNumber: number): Promise<GetIssueByNumberResponseType['data']> {
        try {
            const response = await this.octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
                owner,
                repo,
                issue_number: issueNumber,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            return response.data;
        } catch (error: string | any) {
            throw new Error(error);
        }
    }

    /**
     * Method to update a specific issue by its number in a given repository.
     * @param {string} owner - The owner of the repository.
     * @param {string} repo - The name of the repository.
     * @param {number} issueNumber - The number of the issue.
     * @param {UpdateIssueOptions} options - The options to update for the issue.
     * @returns {Promise<UpdateIssueResponseType["data"]>} A promise that resolves to the data of the response.
     */
    public async updateIssue(owner: string, repo: string, issueNumber: number, options: UpdateIssueOptions): Promise<UpdateIssueResponseType["data"]> {
        try {
            const response = await this.octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
                owner,
                repo,
                issue_number: issueNumber,
                ...options,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            return response.data;
        } catch (error: string | any) {
            throw new Error(error);
        }
    }
}

export default GitHubAPI