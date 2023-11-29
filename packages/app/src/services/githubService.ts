import axios from "axios";
import { Issue } from "@ls1intum/uicompanion-shared/models/Issue";

export async function commentPrototypesOnGithub(issue: Issue): Promise<void> {
    const url = `${issue.repository_url}/issues/${issue.number}/comments`;
    const comment = issue.prototypeUrls.map(url => `![Bild](${url})`).join('\n');

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