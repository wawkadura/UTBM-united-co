import { Test, TestingModule } from '@nestjs/testing';
import { SingInController } from './sing-in.controller';

describe('SingInController', () => {
  let controller: SingInController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SingInController],
    }).compile();

    controller = module.get<SingInController>(SingInController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
