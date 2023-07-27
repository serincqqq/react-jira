import { Schema } from 'mongoose';
export const userSchema = new Schema({
  //属性名:属性类型
  userType: String,
  userName: String,
  userAvatar: String,
});
