import { Module } from '@nestjs/common';
import { SuffixController } from './suffix.controller';
import { SuffixService } from './suffix.service';
import { MongooseModule } from '@nestjs/mongoose';
import { suffixSchema } from './suffix.schema';
const SuffixTable = MongooseModule.forFeature([
  { name: 'Suffixes', schema: suffixSchema },
]);
@Module({
  imports: [SuffixTable],
  controllers: [SuffixController],
  providers: [SuffixService],
})
export class SuffixModule {}
