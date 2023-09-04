import { Request, Response } from 'express';

export class PrototypesController {

    public async postPrototypes(req: Request, res: Response): Promise<void> {
        const file: any = req.file;

        // TODO: Make url dynamic (production/development)
        res.status(200).json({
            message: 'Image uploaded successfully',
            id: file.id,
            url: `https://uicompanion.ase.cit.tum.de/api/prototypes/${file.filename}`,
        });
    }

}