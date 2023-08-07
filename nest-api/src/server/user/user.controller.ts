/**
 * 新建 controller
 * @dependence nest g controller user server
 */
import {
  Controller,
  Get,
  Query,
  Headers,
  Request,
  Post,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';
import { Response, generateResponse } from '../response';
import { resolve } from 'path';
// import jwt from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
const tokenMap = new Map();
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
  //   @Get('profile')
  //   async findOneUser(
  //     @Query('userName') userName: string,
  //     @Query('password') password: string,
  //     @Headers('authorization') token: string,
  //   ): Promise<unknown> {
  //     console.log('vc', token);
  //     if (token) {
  //       jwt.verify(token, 'cq277', (err) => {
  //         if (err) {
  //           return { code: 401 };
  //         } else {
  //           const user = tokenMap.get(token);
  //           if (user) {
  //             return { code: 0 };
  //           }
  //         }
  //       });
  //     } else {
  //       const data = await this.userService.findUser(userName, password);
  //       const token = jwt.sign({ userId: data._id }, 'cq277', {
  //         expiresIn: '1h',
  //       });
  //       tokenMap.set(token, data._id);
  //       return { token, ...generateResponse(data) };
  //     }
  //   }
  // }

  @Post('profile')
  @HttpCode(200)
  async findOneUser(@Request() req): Promise<unknown> {
    console.log('vc', req.body, req.headers.authorization);
    const { userName, password } = req.body;
    const token = req.headers.authorization;
    if (token) {
      const p = await new Promise((resolve) => {
        jwt.verify(token, 'cq277', (err, decoded) => {
          if (err) {
            resolve({ code: 401, message: 'token过期' });
          } else {
            req.user = decoded;
            resolve(generateResponse(undefined));
          }
        });
      });
      return p;
    } else {
      // 第一次请求，返回 Token
      const data = await this.userService.findUser(userName, password);
      const token = jwt.sign({ userId: data._id }, 'cq277', {
        expiresIn: '1m',
      });
      return { token, ...generateResponse(data) };
    }
  }
}
