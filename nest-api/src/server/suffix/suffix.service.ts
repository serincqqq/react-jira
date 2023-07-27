import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Suffix } from './suffix.interface';
@Injectable()
export class SuffixService {
  constructor(
    @InjectModel('Suffixes') private readonly suffixModel: Model<Suffix>,
  ) {}
  async findAll(): Promise<Suffix[]> {
    const suffixes = await this.suffixModel.find();
    return suffixes;
  }
}
