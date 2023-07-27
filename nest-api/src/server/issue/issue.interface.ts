import { Document } from 'mongoose';
interface Comment {
  name: string;
  avatar: string;
  id: string;
  publishTime: string;
  content: string;
  updatedAt: string;
}
export interface Issue extends Document {
  readonly issuetype: string;
  readonly summary: string;
  readonly description: string;
  readonly priority: {
    label: string;
    key: string;
  };
  readonly reporter: {
    label: string;
    key: string;
    value: string;
  };
  readonly assignee: {
    label: string;
    key: string;
    value: string;
  };
  readonly multiple: string;
  readonly status: {
    label: string;
    key: string;
  };
  readonly comments: Array<Comment>;
  readonly timeRemaining: number;
  readonly estimate: number;
  readonly timeSpent: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}
