import axios from 'axios';
import { Issue } from '@ls1intum/uicompanion-shared/models/Issue';

const baseUrl = process.env.NODE_ENV == 'production' ? 'https://uicompanion.ase.cit.tum.de' : 'https://smee.io/pw84GLld8PTLGAok';

export async function confirmPrototypes(issue: Issue): Promise<Issue> {
    try {
        const response = await axios.post(`${baseUrl}/message/prototype/`, issue);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
