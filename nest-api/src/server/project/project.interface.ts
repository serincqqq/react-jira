import { Document } from 'mongoose';

export interface Project extends Document {
  readonly projectName: string;
  readonly description: string;
  readonly managerName: string;
  readonly managerEmail: string;
  readonly managerAvatar: string;
  readonly projectType: string;
  readonly keyword: string;
}
