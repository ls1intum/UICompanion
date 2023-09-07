import { Request, Response } from 'express';
import { IIssue, Issue } from '../model/Issue';

export class IssueController {
    // getIssues function for GET /api/issues
    public async getIssues(req: Request, res: Response): Promise<void> {
        const issues = await Issue.find();

        res.json({ issues });
    }

    // createIssue function for POST /api/issues
    public async createIssue(req: Request, res: Response): Promise<void> {
        const newIssue: IIssue = new Issue(req.body);

        console.log("New issue:", newIssue);

        const createdIssue = await newIssue.save();
        if (!createdIssue) {
            console.log("Issue could not be saved");
            res.status(400).send();
        } else {
            console.log("Issue saved successfully");
            res.status(200).send(createdIssue);
        }
    }

    // updateIssue function for PATCH /api/issues/:number
    public async updateIssue(req: Request, res: Response): Promise<void> {
        const issueNumber = req.params.number;
        const updateData = req.body;

        try {
            const updatedIssue = await Issue.findOneAndUpdate({ number: issueNumber }, updateData, { new: true });

            if (!updateData) {
                console.log("Issue not found");
                res.status(404).send();
            } else {
                console.log("Issue updated successfully");
                res.status(200).send(updatedIssue);
            }
        } catch (error) {
            console.error("Error updating issue:", error);
            res.status(500).send();
        }
    }
}