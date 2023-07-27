import { Document } from 'mongoose';

export interface User extends Document {
  readonly userType: string;
  readonly userName: string;
  readonly userAvatar: string;
}
