import { Request, Response } from 'express';
import { commentPrototypesOnGithub } from '../services/githubService';
import {IssueMetadata} from "@repo/shared";

export class MessageController {

    public async handlePrototypeMessage(req: Request, res: Response): Promise<void> {
        const issue: IssueMetadata = req.body;
        
        try {
            await commentPrototypesOnGithub(issue).then(() => {
                res.status(200).json({
                    message: 'Prototype was appended to the corresponding Github issue.',
                });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error while appending prototype to Github issue.',
            });
        }
    }

}
