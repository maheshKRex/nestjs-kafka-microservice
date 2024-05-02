import { Test, TestingModule } from '@nestjs/testing';
import { UserStoreController } from './user-store.controller';

describe('UserStoreController', () => {
  let controller: UserStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserStoreController],
    }).compile();

    controller = module.get<UserStoreController>(UserStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
