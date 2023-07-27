import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.schema';
const UserTable = MongooseModule.forFeature([
  { name: 'Users', schema: userSchema },
]);

@Module({
  imports: [UserTable],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
