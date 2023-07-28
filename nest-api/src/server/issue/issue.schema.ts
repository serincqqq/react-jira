import { Schema } from 'mongoose';
export const issueSchema = new Schema({
  issuetype: String,
  summary: { type: String, required: true },
  description: String,
  priority: { type: Object, required: true },
  //reporter展示的时候是需要有头像和名字的
  reporter: { type: Object, required: true },
  assignee: { type: Object, required: true },
  multiple: String,
  status: { type: Object, required: true },
  comments: Array,
  timeRemaining: Number,
  estimate: Number,
  timeSpent: Number,
  createdAt: String,
  updatedAt: String,
  connectedProject: { type: String, required: true },
});
