import { Request, Response } from 'express';

export class PrototypesController {

    public async postPrototypes(req: Request, res: Response): Promise<void> {
        const file: any = req.file;

        console.log("File: ", file)

        res.status(200).json({
            message: 'Image uploaded successfully',
            id: file.id,
            url: `${process.env.SERVER_BASE_URL}/api/prototypes/${file.filename}`,
        });
    }

}