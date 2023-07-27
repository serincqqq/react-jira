import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { issueSchema } from './issue.schema';
import { MongooseModule } from '@nestjs/mongoose';
const IssueTable = MongooseModule.forFeature([
  { name: 'Issue', schema: issueSchema },
]);
@Module({
  imports: [IssueTable],
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}
