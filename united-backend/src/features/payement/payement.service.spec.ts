import { Test, TestingModule } from '@nestjs/testing';
import { PayementService } from './payement.service';

describe('PayementService', () => {
  let service: PayementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayementService],
    }).compile();

    service = module.get<PayementService>(PayementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
