import { Module } from '@nestjs/common';
import { IdempotentProducerService } from './idempontent-producer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    providers: [IdempotentProducerService]
})
export class IdempotentProducerModule {}
