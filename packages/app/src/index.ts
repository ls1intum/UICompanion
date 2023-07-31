import { Probot } from "probot";
import { Issue } from "@octokit/webhooks-types"
import { persistIssue } from "./services/issueService";

export = (app: Probot) => {
  app.on("issues.opened", async (context) => {
    const issue: Issue = context.payload.issue;
    const labels: String[] | undefined = issue.labels?.map((label) => label.name);

    if (labels?.includes('UI')) {
      app.log.debug('Creating a comment on issue')

      // Persist issue on application server
      persistIssue(app, issue, context);

    } else {
      console.log('No comment created')
    }
    
  });
};
