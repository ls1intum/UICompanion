import { MockupProgress } from '../enums/MockupProgress';
import { Document as MongooseDocument } from 'mongoose';

export interface IssueMetadata {
  repository_url: string;
  number: number;
  progress: MockupProgress;
  frames: string[];
  prototypeUrls: string[];
}

export interface IIssueMetadata extends MongooseDocument {
  repository_url: string;
  number: number;
  progress: MockupProgress;
  frames: string[];
  prototypeUrls: string[];
}
