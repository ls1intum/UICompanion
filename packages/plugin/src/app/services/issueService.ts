import axios from 'axios';
import { Issue } from '../models/Issue';

const baseUrl = process.env.NODE_ENV == 'production' ? 'https://uicompanion.ase.cit.tum.de' : 'http://localhost:3001';

export async function getIssues(): Promise<Issue[]> {
  try {
    const response = await axios.get(`${baseUrl}/api/issues`);
    return response.data.issues;
  } catch (error) {
    throw new Error(error);
  }
} 

export async function updateIssue(issue: Issue): Promise<Issue> {
  try {
    const response = await axios.patch(`${baseUrl}/api/issues/${issue.number}`, issue);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
