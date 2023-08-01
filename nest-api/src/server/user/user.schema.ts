import { Schema } from 'mongoose';
export const userSchema = new Schema({
  userName: String,
  userAvatar: String,
  password: String,
  userEmail: String,
});
