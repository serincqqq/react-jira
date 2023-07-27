import { Schema } from 'mongoose';
export const projectSchema = new Schema({
  //属性名:属性类型
  projectName: String,
  description: String,
  managerName: String,
  managerEmail: String,
  managerAvatar: String,
  projectType: String,
  keyword: String,
});
