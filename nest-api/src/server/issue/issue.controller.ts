import { Controller, Body, Query, Post, Get, HttpCode } from '@nestjs/common';
import { CreateCommentDTO, CreateIssueDTO } from './issue.dto';
import { Issue } from './issue.interface';
import { IssueService } from './issue.service';
import { Response, generateResponse } from '../response';

@Controller('/jira/issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}
  @Get('list')
  async findAll(
    @Query('connectedProject') connectedProject: string,
  ): Promise<Response<Issue[]>> {
    const data = await this.issueService.findAll(connectedProject);
    return generateResponse(data);
  }
  @Get('delete')
  async deleteOne(@Query('issueId') issueId: string): Promise<Response> {
    await this.issueService.deleteOne(issueId);
    return generateResponse(undefined);
  }
  @Get('recent')
  async findRecent(): Promise<Response<Issue[]>> {
    const data = await this.issueService.findRecent();
    return generateResponse(data);
  }
  @Get('detail')
  async findOne(@Query('issueId') issueId: string): Promise<Response<Issue>> {
    const data = await this.issueService.findOne(issueId);
    return generateResponse(data);
  }

  @Post('comments')
  @HttpCode(200)
  async updateComment(
    @Query('issueId') issueId: string,
    @Body() comment: CreateCommentDTO,
  ): Promise<Response> {
    await this.issueService.updateComment(issueId, comment);
    return generateResponse(undefined);
  }
  @Post('update')
  @HttpCode(200)
  async update(
    @Query('issueId') issueId: string,
    @Body() body: CreateIssueDTO,
  ): Promise<Response> {
    await this.issueService.updateOne(issueId, body);
    return generateResponse(undefined);
  }
  @Post('create')
  @HttpCode(200)
  async addOne(@Body() body: CreateIssueDTO): Promise<Response> {
    await this.issueService.addOne(body);
    return generateResponse(undefined);
  }
  @Get('search')
  async searchItems(
    @Query('searchQuery') searchQuery: string,
  ): Promise<Response<Issue[]>> {
    const data = await this.issueService.searchItems(searchQuery);
    return generateResponse(data);
  }
}
