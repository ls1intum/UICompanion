import axios from "axios";
import {IssueMetadata} from "@repo/shared";


export async function commentPrototypesOnGithub(issue: IssueMetadata): Promise<void> {
    const url = `${issue.repository_url}/issues/${issue.number}/comments`;
    const comment = issue.prototypeUrls.map((url: any) => `![Bild](${url})`).join('\n');

    try {
        const response = await axios.post(url, { body: comment }, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(`Kommentar erfolgreich hinzugefügt: ${response.data}`);
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Kommentars:', error);
    }
}