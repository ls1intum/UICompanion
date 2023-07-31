import axios from 'axios';
import { Context, Probot } from 'probot';
import { Issue } from "@octokit/webhooks-types"


export async function persistIssue(
    app: Probot,
    issue: Issue, 
    probotContext: Context
): Promise<void> {
  let data = {
    "title": issue.title,
    "description": issue.body,
    "status": issue.state
  };

  console.log('test', issue)

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

    console.log(response)

    const issueComment = probotContext.issue({
        body: "Thanks for opening this issue!",
    });

    await probotContext.octokit.issues.createComment(issueComment);
    })
    .catch((error) => {
        app.log.debug("POST /api/issues error: ", error.response.status);
    });
} 