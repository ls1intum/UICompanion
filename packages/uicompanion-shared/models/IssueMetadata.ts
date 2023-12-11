import { Document } from 'mongoose';
import MockupProgress from "../enums/MockupProgress";

interface IssueMetadata {
    repository_url: string;
    number: number;
    progress: MockupProgress;
    frames: string[];
    prototypeUrls: string[];
}

interface IIssueMetadata extends Document {
    repository_url: string;
    number: number;
    progress: MockupProgress;
    frames: string[];
    prototypeUrls: string[];
}

export default IssueMetadata;
export { IIssueMetadata };