import { Request, Response } from 'express';
import { IIssue, Issue } from '../model/Issue';

export class IssueController {
    public async getIssues(req: Request, res: Response): Promise<void> {
        const issues = await Issue.find();

        res.json({ issues });
    }

    public async createIssue(req: Request, res: Response): Promise<void> {
        const newIssue: IIssue = new Issue(req.body);

        const createdIssue = await newIssue.save();
        if (!createdIssue) {
            console.log("Issue could not be saved");
            res.status(400).send();
        } else {
            console.log("Issue saved successfully");
            res.status(200).send(createdIssue);
        }
    }
}