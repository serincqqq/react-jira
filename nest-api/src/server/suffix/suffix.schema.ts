import { Schema } from 'mongoose';
export const suffixSchema = new Schema({
  //属性名:属性类型
  label: String,
  value: String,
});
