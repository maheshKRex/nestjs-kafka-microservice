import { Module } from '@nestjs/common';
import { UserStoreController } from './user-store.controller';
import { UserStoreService } from './user-store.service';
import { UsersRepository } from './user.repository';
import { IdempotentConsumerService } from 'src/common/consumer/idempotent-consumer.service';
import { ProcessedMessageRepository } from 'src/common/consumer/processed-message.repository';

@Module({
  imports:[UsersRepository, ProcessedMessageRepository],
  controllers: [UserStoreController],
  providers: [UserStoreService, UsersRepository, IdempotentConsumerService, ProcessedMessageRepository]
})
export class UserStoreModule {}
