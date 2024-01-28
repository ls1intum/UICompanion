"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
// Routes
const issues_1 = require("./routes/issues");
const prototypes_1 = require("./routes/prototypes");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
app.use(issues_1.issuesRouter);
app.use(prototypes_1.prototypesRouter);
const mongoURI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/issues?authSource=admin`;
mongoose_1.default.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});
app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});
