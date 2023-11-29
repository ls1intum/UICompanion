import { Request, Response } from 'express';
import { Issue } from "@ls1intum/uicompanion-shared/models/Issue";
import { commentPrototypesOnGithub } from '../services/githubService';

export class MessageController {

    public async handlePrototypeMessage(req: Request, res: Response): Promise<void> {
        const issue: Issue = req.body;
        
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
