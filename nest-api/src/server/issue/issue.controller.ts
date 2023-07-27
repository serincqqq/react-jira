import { Controller, Body, Query, Param, Post, Get } from '@nestjs/common';
import { CreateCommentDTO, CreateIssueDTO } from './issue.dto';
import { Issue } from './issue.interface';
import { IssueService } from './issue.service';

interface IssueResponse<T = unknown> {
  code: number;
  data?: T;
  msg: string;
}
@Controller('/jira/issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}
  @Get('list')
  async findAll(): Promise<IssueResponse<Issue[]>> {
    return {
      code: 0,
      data: await this.issueService.findAll(),
      msg: 'success',
    };
  }
  @Get('delete')
  async deleteOne(
    @Param('issueId') issueId: string,
  ): Promise<IssueResponse<Issue[]>> {
    await this.issueService.deleteOne(issueId);
    return {
      code: 0,
      msg: 'success',
    };
  }
  @Get('recent')
  async findRecent(): Promise<IssueResponse<Issue[]>> {
    return {
      code: 0,
      data: await this.issueService.findRecent(),
      msg: 'success',
    };
  }
  @Get('detail')
  async findOne(
    @Query('issueId') issueId: string,
  ): Promise<IssueResponse<Issue>> {
    return {
      code: 0,
      data: await this.issueService.findOne(issueId),
      msg: 'success',
    };
  }

  @Post('comments')
  async updateComment(
    @Param('issueId') issueId: string,
    @Body() comment: CreateCommentDTO,
  ): Promise<IssueResponse<Issue[]>> {
    await this.issueService.updateComment(issueId, comment);
    return {
      code: 0,
      msg: 'success',
    };
  }
  @Post('update')
  async update(
    @Param('issueId') issueId: string,
    @Body() body: CreateIssueDTO,
  ): Promise<IssueResponse<Issue[]>> {
    await this.issueService.updateOne(issueId, body);
    return {
      code: 0,
      msg: 'success',
    };
  }
  @Post('create')
  async addOne(@Body() body: CreateIssueDTO): Promise<IssueResponse<Issue[]>> {
    await this.issueService.addOne(body);
    return {
      code: 0,
      msg: 'success',
    };
  }
  @Get('search')
  async searchItems(
    @Query('searchQuery') searchQuery: string,
  ): Promise<IssueResponse<Issue[]>> {
    return {
      code: 0,
      data: await this.issueService.searchItems(searchQuery),
      msg: 'success',
    };
  }
}
