import axios from 'axios';
import {IssueMetadata} from "@repo/shared";

class UICompanionAPI {
    private static instance: UICompanionAPI;
    private readonly baseUrl: string;

    private constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public static getInstance(baseUrl: string): UICompanionAPI {
        if (!UICompanionAPI.instance) {
            UICompanionAPI.instance = new UICompanionAPI(baseUrl);
        }
        return UICompanionAPI.instance;
    }

    public async getIssueMetadata(): Promise<IssueMetadata[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/issues`);
            return response.data.issues;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async createIssueMetadata(issueMetadata: IssueMetadata): Promise<IssueMetadata> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/issues`, issueMetadata);
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async updateIssueMetadata(issueMetadata: IssueMetadata): Promise<IssueMetadata> {
        try {
            const response = await axios.patch(`${this.baseUrl}/api/issues/${issueMetadata.number}`, issueMetadata);
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async confirmPrototypes(issue: IssueMetadata): Promise<IssueMetadata> {
        try {
            const response = await axios.post(`${this.baseUrl}/message/prototype/`, issue);
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async postPrototype(bytes: Uint8Array) {
        try {
            const blob = new Blob([bytes], { type: 'application/octet-stream' });
            let data = new FormData();
            data.append('prototypes', blob, 'prototype.png');

            let config = {
                method: 'post',
                url: `${this.baseUrl}/api/prototypes`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: data,
            };

            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default UICompanionAPI;
