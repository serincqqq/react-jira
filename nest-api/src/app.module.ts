import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './server/user/user.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './server/project/project.module';
import { SuffixModule } from './server/suffix/suffix.module';
import { IssueModule } from './server/issue/issue.module';

const DBRootModule = MongooseModule.forRoot(
  'mongodb://localhost:27017/jira_data',
);
@Module({
  imports: [UserModule, DBRootModule, ProjectModule, SuffixModule, IssueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
