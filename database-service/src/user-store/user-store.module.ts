import { Module } from '@nestjs/common';
import { UserStoreController } from './user-store.controller';
import { UserStoreService } from './user-store.service';
import { UsersRepository } from './user.repository';

@Module({
  imports:[],
  controllers: [UserStoreController],
  providers: [UserStoreService, UsersRepository]
})
export class UserStoreModule {}
