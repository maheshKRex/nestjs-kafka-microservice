import { Module } from '@nestjs/common';
import { IdempotentConsumerService } from './idempotent-consumer.service';
import { ProcessedMessageRepository } from './processed-message.repository';
import { UserStoreService } from 'src/user-store/user-store.service';
import { UsersRepository } from 'src/user-store/user.repository';

@Module({
    imports: [],
    providers: [IdempotentConsumerService, ProcessedMessageRepository, UserStoreService, UsersRepository]
})
export class IdempotentConsumerModule {}