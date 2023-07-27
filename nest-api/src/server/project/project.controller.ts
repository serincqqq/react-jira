import { Controller, Get, Param, Query, Body, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.interface';
import { EditProjectDTO } from './project.dto';
import { ProjectResponse, generateResponse } from '../response';

@Controller('/jira/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('list')
  // @Header('Access-Control-Allow-Origin', 'http://localhost:3002')
  async findAll(): Promise<ProjectResponse<Project[]>> {
    const data = await this.projectService.findAll();
    return generateResponse(data);
  }
  @Get('search')
  async searchAll(
    @Param('searchQuery') searchQuery: string,
    @Param('searchType') searchType: string,
  ): Promise<ProjectResponse<Project[]>> {
    const data = await this.projectService.searchAll(searchQuery, searchType);
    return generateResponse(data);
  }
  @Post('edit')
  async editOne(
    @Query('projectId') projectId: string,
    @Body() body: EditProjectDTO,
  ): Promise<ProjectResponse> {
    await this.projectService.editOne(projectId, body);
    return generateResponse(undefined);
  }
  @Get('detail')
  async findOne(
    @Param('projectId') projectId: string,
  ): Promise<ProjectResponse<Project>> {
    console.log('bb', projectId);
    const data = await this.projectService.findOne(projectId);
    return generateResponse(data);
  }
  @Get('delete')
  async deleteOne(
    @Query('projectId') projectId: string,
  ): Promise<ProjectResponse> {
    await this.projectService.deleteOne(projectId);
    return generateResponse(undefined);
  }
}
