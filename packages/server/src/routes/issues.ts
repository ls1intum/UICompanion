import express from 'express';
import { IssueController } from '../controllers/issueController';

const router = express.Router();
const issueController = new IssueController();

router.get('/api/issues', issueController.getIssues);

router.post('/api/issues', issueController.createIssue);

router.patch('/api/issues/:number', issueController.updateIssue);

export { router as issuesRouter };