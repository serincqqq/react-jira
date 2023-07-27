/**
 * 新建 controller
 * @dependence nest g controller user server
 */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('jira/user')
export class UserController {
  // 实例化 provider
  constructor(private readonly userService: UserService) {}

  @Get('allUser')
  async findAll(): Promise<UserResponse<User[]>> {
    return {
      code: 0,
      data: await this.userService.findAll(),
      message: 'Success.',
    };
  }

  @Get('userList')
  async findItems(@Param('_id') _id: string): Promise<UserResponse<User[]>> {
    return {
      code: 0,
      data: await this.userService.findItems(_id),
      message: 'Success.',
    };
  }
  @Get('userAvatar')
  async findOneAvatar(@Query('id') id: string): Promise<UserResponse> {
    return {
      code: 0,
      data: await this.userService.findOneAvatar(id),
      message: 'Success.',
    };
  }
}
