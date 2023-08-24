import axios from 'axios';
import { Issue } from '../models/Issue';


export async function getIssues(): Promise<Issue[]> {
  const issues: Issue[] = [];
  
  axios.get(
    'http://localhost:3001/api/issues',
  )
  .then(async (response) => {
    issues.push(...response.data);
  })
  .catch((error) => {
    throw new Error(error);
  });

  return issues;
} 
