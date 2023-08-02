/**
 * 新建 controller
 * @dependence nest g controller user server
 */
import { Controller, Get, Query } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';
import { Response, generateResponse } from '../response';
// import jwt from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
@Controller('jira/user')
export class UserController {
  // 实例化 provider
  constructor(private readonly userService: UserService) {}

  @Get('allUser')
  async findAll(): Promise<Response<User[]>> {
    const data = await this.userService.findAll();
    return generateResponse(data);
  }

  @Get('userList')
  async findItems(
    @Query('searchQuery') searchQuery: string,
  ): Promise<Response<User[]>> {
    const data = await this.userService.findItems(searchQuery);
    return generateResponse(data);
  }
  @Get('userAvatar')
  async findOneAvatar(@Query('id') id: string): Promise<Response> {
    const data = await this.userService.findOneAvatar(id);
    return generateResponse(data);
  }
  @Get('profile')
  async findOneUser(
    @Query('userName') userName: string,
    @Query('password') password: string,
  ): Promise<unknown> {
    const data = await this.userService.findUser(userName, password);
    const token = jwt.sign({ userId: data._id }, 'cq277', { expiresIn: '1h' });
    return { token, ...generateResponse(data) };
  }
}
