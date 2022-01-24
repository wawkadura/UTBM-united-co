import { Test, TestingModule } from '@nestjs/testing';
import { PayementController } from './payement.controller';

describe('PayementController', () => {
  let controller: PayementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayementController],
    }).compile();

    controller = module.get<PayementController>(PayementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
