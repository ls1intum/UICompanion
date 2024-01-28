import axios from 'axios';
import {IssueMetadata} from "@repo/shared";

const baseUrl = process.env.NODE_ENV == 'production' ? 'https://uicompanion.ase.cit.tum.de' : 'http://localhost:3001';

export async function getIssueMetadata(): Promise<IssueMetadata[]> {
  try {
    const response = await axios.get(`${baseUrl}/api/issues`);
    return response.data.issues;
  } catch (error) {
    throw new Error(error);
  }
} 

export async function updateIssueMetadata(issueMetadata: IssueMetadata): Promise<IssueMetadata> {
  try {
    const response = await axios.patch(`${baseUrl}/api/issues/${issueMetadata.number}`, issueMetadata);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
