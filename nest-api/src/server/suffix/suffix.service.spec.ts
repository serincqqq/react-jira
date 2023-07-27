import { Test, TestingModule } from '@nestjs/testing';
import { SuffixService } from './suffix.service';

describe('SuffixService', () => {
  let service: SuffixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuffixService],
    }).compile();

    service = module.get<SuffixService>(SuffixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
