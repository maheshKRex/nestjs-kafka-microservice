import { Module } from '@nestjs/common';
import { IdempotentProducerService } from './idempontent-producer.service';

@Module({
    providers: [IdempotentProducerService]
})
export class IdempotentProducerModule {}
