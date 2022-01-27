import { Test, TestingModule } from '@nestjs/testing';
import { SingInService } from './sign-in.service';

describe('SingInService', () => {
  let service: SingInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SingInService],
    }).compile();

    service = module.get<SingInService>(SingInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
