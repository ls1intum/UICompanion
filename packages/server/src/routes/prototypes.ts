import express from 'express';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { PrototypesController } from '../controllers/prototypesController';
import { MongoClient } from 'mongodb';
import { GridFSBucket } from 'mongodb';

const router = express.Router();
const prototypesController = new PrototypesController();

const mongoURI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/prototypes?authSource=admin`
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/gif'
        ) {
            return {
                bucketName: 'prototypes',
                filename: `${Date.now()}_${file.originalname}`,
            };
        } else {
            return `${Date.now()}_${file.originalname}`;
        }
    },
});
const upload = multer({ storage });
const mongoClient = new MongoClient(mongoURI)

router.post('/api/prototypes', upload.single('prototypes'), prototypesController.postPrototypes);

router.get("/api/prototypes/:filename", async (req, res) => {
    try {
        await mongoClient.connect()

        const database = mongoClient.db("prototypes")

        const imageBucket = new GridFSBucket(database, {
            bucketName: "prototypes",
        })

        let downloadStream = imageBucket.openDownloadStreamByName(
            req.params.filename
        )

        downloadStream.on("data", function (data) {
            return res.status(200).write(data)
        })

        downloadStream.on("error", function (data) {
            return res.status(404).send({ error: "Image not found" })
        })

        downloadStream.on("end", () => {
            return res.end()
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error Something went wrong",
            error,
        })
    }
})

export { router as prototypesRouter };
