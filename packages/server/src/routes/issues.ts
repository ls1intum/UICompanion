import express, { Request, Response } from 'express';
import { Issue } from '../model/Issue';
import { IssueController } from '../controllers/issueController';

const router = express.Router();
const issueControler = new IssueController();

router.get('/api/issues', issueControler.getIssues);

router.post('/api/issues', issueControler.createIssue);

router.patch('/api/issues/:number', issueControler.updateIssue);

export { router as issuesRouter };