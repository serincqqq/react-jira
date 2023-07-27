import { Test, TestingModule } from '@nestjs/testing';
import { SuffixController } from './suffix.controller';

describe('SuffixController', () => {
  let controller: SuffixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuffixController],
    }).compile();

    controller = module.get<SuffixController>(SuffixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
