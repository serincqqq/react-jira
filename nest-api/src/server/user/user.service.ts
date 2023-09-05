/**
 * 新建 provider
 * @dependence nest g service user server
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOneAvatar(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findItems(searchQuery: string): Promise<User[]> {
    return await this.userModel.find({
      userName: { $regex: searchQuery, $options: 'i' },
    });
  }
  async findUser(userName: string, password: string): Promise<User> {
    return await this.userModel.findOne({
      userName,
      password,
    });
  }
}
