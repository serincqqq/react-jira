import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIssueDTO, CreateCommentDTO } from './issue.dto';
import { Issue } from './issue.interface';
@Injectable()
export class IssueService {
  constructor(
    @InjectModel('Issue') private readonly issueModel: Model<Issue>,
  ) {}
  async findAll(): Promise<Issue[]> {
    const issues = await this.issueModel.find();
    return issues;
  }
  async deleteOne(issueId: string): Promise<void> {
    await this.issueModel.findByIdAndDelete(issueId);
  }
  async searchItems(searchQuery: string): Promise<Issue[]> {
    return await this.issueModel.find({
      $or: [
        { _id: { $regex: searchQuery, $options: 'i' } },
        { summary: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ],
    });
  }
  async findOne(issueId: string): Promise<Issue> {
    return await this.issueModel.findById(issueId);
  }
  async findRecent(): Promise<Issue[]> {
    return await this.issueModel.aggregate([{ $sort: { updatedAt: -1 } }]);
  }
  async updateOne(issueId: string, body: CreateIssueDTO): Promise<void> {
    await this.issueModel.findByIdAndUpdate(issueId, body);
  }
  async updateComment(
    issueId: string,
    comments: CreateCommentDTO,
  ): Promise<void> {
    await this.issueModel.updateOne(
      { _id: issueId },
      { $addToSet: { comments: comments } },
    );
  }
  async addOne(body: CreateIssueDTO): Promise<void> {
    await this.issueModel.create(body);
  }
}
