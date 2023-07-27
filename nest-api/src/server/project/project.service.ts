import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.interface';
import { CreateProjectDTO, EditProjectDTO } from './project.dto';
@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Projects') private readonly projectModel: Model<Project>,
  ) {}
  async findAll(): Promise<Project[]> {
    const projects = await this.projectModel.find();
    return projects;
  }

  async searchAll(searchQuery: string, searchType: string): Promise<Project[]> {
    return await this.projectModel.find({
      projectType: searchType,
      $or: [
        { projectName: { $regex: searchQuery, $options: 'i' } },
        { managerName: { $regex: searchQuery, $options: 'i' } },
        { keyword: { $regex: searchQuery, $options: 'i' } },
        // ... 其他字段
      ],
    });
  }
  async createOne(body: CreateProjectDTO): Promise<void> {
    await this.projectModel.create(body);
  }
  async deleteOne(projectId: string): Promise<void> {
    await this.projectModel.findByIdAndDelete(projectId);
  }
  async editOne(projectId: string, body: EditProjectDTO): Promise<void> {
    await this.projectModel.findByIdAndUpdate(projectId, body);
  }
  async findOne(projectId: string): Promise<Project> {
    return await this.projectModel.findById(projectId);
  }
}
