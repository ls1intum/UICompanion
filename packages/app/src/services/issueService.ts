import axios from 'axios';
import { Probot } from 'probot';
import { Issue as GitHubIssue } from "@octokit/webhooks-types"
import { IssueStatus } from '../models/IssueStatus';
import { Issue } from '../models/Issue';


export async function persistIssue(
    app: Probot,
    issue: GitHubIssue
): Promise<void> {
  let data: Issue = {
    respotory_url: issue.repository_url,
    number: issue.number,
    title: issue.title,
    description: issue.body || '',
    status: IssueStatus.OPEN,
    frames: [],
    prototypeUrls: [],
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

    })
  .catch((error) => {
      app.log.debug("POST /api/issues error: ", error);
  });
} 