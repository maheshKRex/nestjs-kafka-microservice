import { Module } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    providers: [KafkaProducerService]
})
export class KafkaProducerModule {}
