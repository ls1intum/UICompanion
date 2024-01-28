"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prototypesRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const prototypesController_1 = require("../controllers/prototypesController");
const mongodb_1 = require("mongodb");
const mongodb_2 = require("mongodb");
const router = express_1.default.Router();
exports.prototypesRouter = router;
const prototypesController = new prototypesController_1.PrototypesController();
const mongoURI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/prototypes?authSource=admin`;
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        if (file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/gif') {
            return {
                bucketName: 'prototypes',
                filename: `${Date.now()}_${file.originalname}`,
            };
        }
        else {
            return `${Date.now()}_${file.originalname}`;
        }
    },
});
const upload = (0, multer_1.default)({ storage });
const mongoClient = new mongodb_1.MongoClient(mongoURI);
router.post('/api/prototypes', upload.single('prototypes'), prototypesController.postPrototypes);
router.get("/api/prototypes/:filename", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoClient.connect();
        const database = mongoClient.db("prototypes");
        const imageBucket = new mongodb_2.GridFSBucket(database, {
            bucketName: "fs",
        });
        let downloadStream = imageBucket.openDownloadStreamByName(req.params.filename);
        downloadStream.on("data", function (data) {
            return res.status(200).write(data);
        });
        downloadStream.on("error", function (data) {
            return res.status(404).send({ error: "Image not found" });
        });
        downloadStream.on("end", () => {
            return res.end();
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error Something went wrong",
            error,
        });
    }
}));
