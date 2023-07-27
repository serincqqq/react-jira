import { Document } from 'mongoose';

export interface Suffix extends Document {
  readonly label: string;
  readonly value: string;
}
