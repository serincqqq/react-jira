import { Controller, Get } from '@nestjs/common';
import { Suffix } from './suffix.interface';
import { SuffixService } from './suffix.service';
interface SuffixResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}
@Controller('/jira/option')
export class SuffixController {
  constructor(private readonly suffixService: SuffixService) {}

  @Get('suffixOption')
  async findAll(): Promise<SuffixResponse<Suffix[]>> {
    return {
      code: 0,
      data: await this.suffixService.findAll(),
      message: 'Success.',
    };
  }
}
