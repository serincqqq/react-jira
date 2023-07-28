import { Controller, Get } from '@nestjs/common';
import { Suffix } from './suffix.interface';
import { SuffixService } from './suffix.service';
import { Response, generateResponse } from '../response';

@Controller('/jira/option')
export class SuffixController {
  constructor(private readonly suffixService: SuffixService) {}

  @Get('suffixOption')
  async findAll(): Promise<Response<Suffix[]>> {
    const data = await this.suffixService.findAll();
    return generateResponse(data);
  }
}
