import axios from 'axios';
import { Context, Probot } from 'probot';
import { Issue as GitHubIssue } from "@octokit/webhooks-types"
import { IssueStatus } from '../models/IssueStatus';
import { Issue } from '../models/Issue';


export async function persistIssue(
    app: Probot,
    issue: GitHubIssue, 
    probotContext: Context
): Promise<void> {
  let data: Issue = {
    title: issue.title,
    description: issue.body || '',
    status: IssueStatus.OPEN,
    frames: []
  };

  axios.post(
    'http://uicompanion-server:3001/api/issues',
    data,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
  )
  .then(async (response) => {
    app.log.debug("POST /api/issues status code: ", response.data);

    const issueComment = probotContext.issue({
        body: "Thanks for opening this issue!",
    });

    await probotContext.octokit.issues.createComment(issueComment);
    })
    .catch((error) => {
        app.log.debug("POST /api/issues error: ", error);
    });
} 