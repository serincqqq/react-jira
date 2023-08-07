import { Controller, Get, Query, Body, Post, HttpCode } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.interface';
import { EditProjectDTO } from './project.dto';
import { Response, generateResponse } from '../response';

@Controller('/jira/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('list')
  // @Header('Access-Control-Allow-Origin', 'http://localhost:3002')
  async findAll(@Query('type') type: string): Promise<Response<Project[]>> {
    const data = await this.projectService.findAll(type);
    return generateResponse(data);
  }
  @Get('search')
  async searchAll(
    @Query('searchQuery') searchQuery: string,
    @Query('searchType') searchType: string,
  ): Promise<Response<Project[]>> {
    const data = await this.projectService.searchAll(searchQuery, searchType);
    return generateResponse(data);
  }
  @Post('create')
  @HttpCode(200)
  async createOne(@Body() body: EditProjectDTO): Promise<Response<any>> {
    await this.projectService.createOne(body);
    return generateResponse(undefined);
  }
  @Post('edit')
  @HttpCode(200)
  async editOne(
    @Query('projectId') projectId: string,
    @Body() body: EditProjectDTO,
  ): Promise<Response> {
    await this.projectService.editOne(projectId, body);
    return generateResponse(undefined);
  }
  @Get('detail')
  async findOne(
    @Query('projectId') projectId: string,
  ): Promise<Response<Project>> {
    const data = await this.projectService.findOne(projectId);
    return generateResponse(data);
  }
  @Get('delete')
  async deleteOne(@Query('projectId') projectId: string): Promise<Response> {
    console.log('cc', projectId);
    await this.projectService.deleteOne(projectId);
    return generateResponse(undefined);
  }
}
