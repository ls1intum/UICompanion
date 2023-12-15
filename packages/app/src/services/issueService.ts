import axios from 'axios';
import {Probot} from 'probot';
import {Issue as GitHubIssue} from "@octokit/webhooks-types"
import IssueMetadata from '@ls1intum/uicompanion-shared/models/IssueMetadata';
import MockupProgress from "@ls1intum/uicompanion-shared/enums/MockupProgress";


export async function persistIssue(
    app: Probot,
    issue: GitHubIssue
): Promise<void> {
  let data: IssueMetadata = {
    repository_url: issue.repository_url,
    number: issue.number,
    progress: MockupProgress.OPEN,
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