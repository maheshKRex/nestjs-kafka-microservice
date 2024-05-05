import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';
import {
    clientId,
    broker,
} from '../../../kafka-config.json';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProcessedMessageRepository } from './processed-message.repository';

@Injectable()
export class IdempotentConsumerService implements OnModuleInit {
    private consumer: Consumer;
    private kafka: Kafka;

    constructor(
      private readonly processedMessageRepository: ProcessedMessageRepository,
    ) {
        this.kafka = new Kafka({
            clientId: clientId,
            brokers: [broker]
        });
        this.consumer = this.kafka.consumer({ groupId: 'my-group' });
    }

    async onModuleInit() {
        await this.subscribe('idempotent_create_user');
    }

    async subscribe(topic: string) {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic });
        await this.consumer.run({
          eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
            const messageId = message.headers['messageId'].toString(); // Assuming messageId is stored in Kafka message headers
            console.log(`messageId ${messageId}`);
            if (!messageId) {
              return;
            }
            const exists = await this.processedMessageRepository.findOne(messageId);
            if (exists) {
              console.log(`Duplicate message: ${messageId}`);
              await this.consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
              return;
            }
            // Process the message...
            console.log(`Processing message: ${messageId}`);
            // Save the messageId to the database
            await this.processedMessageRepository.save({
                id: messageId,
                processedAt: new Date(),
            });
          },
        });
      }
}
