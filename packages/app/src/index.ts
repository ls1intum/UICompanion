import { Probot } from "probot";
import { Issue } from "@octokit/webhooks-types"
import { persistIssue } from "./services/issueService";
import { MessageController } from "./controllers/messageController";
import { json } from "express";

module.exports = (app: Probot, { getRouter }: any) => {
  // Get an express router to expose new HTTP endpoints
  const router = getRouter("/message");
  const messageController = new MessageController();

  // Use any middleware
  router.use(json());
  router.use(require("express").static("public"));

  // Add a new route
  router.post("/prototype", messageController.handlePrototypeMessage);

  app.on("issues.opened", async (context) => {
    const issue: Issue = context.payload.issue;
    const labels: String[] | undefined = issue.labels?.map((label) => label.name);

    if (labels?.includes('UI')) {
      app.log.debug('Creating a comment on issue')

      const issueComment = context.issue({
        body: "## 🎨 UI Design Required \n\nIt appears that this issue demands some attention to the user interface. To get started, please create a Figma prototype and seek approval from the designated Artemis maintainer.\n\nI'm here to guide you through this process. Simply follow this [Figma Project Link](https://www.figma.com/file/ruz3GxQhxe59shmahjDR0J/Prototype?type=design&node-id=258%3A52&mode=design&t=Cbc4IBgDeGGSKMwJ-1) to access our Figma project. There, you'll receive step-by-step guidance using the UICompanion Figma app."
      });

      await context.octokit.issues.createComment(issueComment);

      // Persist issue on application server
      persistIssue(app, issue);

    } else {
      app.log.error('No comment created')
    }

  });
}; 
