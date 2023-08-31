import axios from 'axios';
import { Issue } from '../models/Issue';


export async function getIssues(): Promise<Issue[]> {
  // const url = 'https://corsproxy.io/?' + encodeURIComponent('https://uicompanion.ase.cit.tum.de/api/issues');
  
  try {
    const response = await axios.get('http://localhost:3001/api/issues');
    return response.data.issues;
  } catch (error) {
    throw new Error(error);
  }
} 
