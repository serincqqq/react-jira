import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { projectSchema } from './project.schema';
const ProjectTable = MongooseModule.forFeature([
  { name: 'Projects', schema: projectSchema },
]);
@Module({
  imports: [ProjectTable],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
