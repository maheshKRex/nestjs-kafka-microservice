import { Module } from '@nestjs/common';
import { IdempotentConsumerService } from './idempotent-consumer.service';
import { ProcessedMessageRepository } from './processed-message.repository';

@Module({
    imports: [ProcessedMessageRepository],
    providers: [IdempotentConsumerService, ProcessedMessageRepository]
})
export class IdempotentConsumerModule {}