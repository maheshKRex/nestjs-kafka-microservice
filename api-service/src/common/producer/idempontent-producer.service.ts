import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

import {
  clientId,
  broker,
  connectionTimeout,
  authenticationTimeout,
  reauthenticationThreshold,
  uniqueProducerId
} from '../../../kafka-config.json';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class IdempotentProducerService {
  private readonly kafkaInstance: Kafka;
  private producer: Producer;

  constructor() {
    this.kafkaInstance = new Kafka({
      clientId: clientId,
      brokers: [broker],
      connectionTimeout: connectionTimeout,
      authenticationTimeout: authenticationTimeout,
      reauthenticationThreshold: reauthenticationThreshold
    });

    this.producer = this.kafkaInstance.producer({
      maxInFlightRequests: 1,
      idempotent: true,
      transactionalId: uniqueProducerId,
      allowAutoTopicCreation: false,
      transactionTimeout: 30000
    });
  }

  async sendMessageWithTransaction(topic: string, user: CreateUserDto): Promise<void> {
    await this.producer.connect();
    const transaction = await this.producer.transaction();
    await transaction.send({
      topic,
      messages: [{
        key: user.id,
        value: JSON.stringify(user.name),
        headers: {
          messageId: user.messageId, // Include messageId in message headers for idempotent consumer
        },
      }],
    });
    if (user.id === 'error') {
      await transaction.abort();
      // retry logic for aborted transaction
      return;
    }
    await transaction.commit();
  }


  async sendMessageZombieTransactionAndMessage(topic: string, user: CreateUserDto): Promise<void> {
    await this.producer.connect();
    const transaction = await this.producer.transaction();
    await transaction.send({
      topic,
      messages: [{
        key: user.id,
        value: JSON.stringify(user.name),
        headers: {
          messageId: user.messageId, // Include messageId in message headers for idempotent consumer
        },
      }],
    });
    this.producer.send({
      topic,
      messages: [{
        key: user.id,
        value: JSON.stringify(user.name),
        headers: {
          messageId: user.messageId, // Include messageId in message headers for idempotent consumer
        },
      }],
    });
  }

  async publishMessage(publisherTopic: string, user: CreateUserDto): Promise<void> {
    await this.producer.connect();
    const sendPayload =
    (producer: Producer) =>
    (topic: string) =>
    (key: string) =>
    (value: string) => {
      return producer.send({
        topic,
        messages: [{
           key,
           value,
           headers: {
            messageId: user.messageId, // Include messageId in message headers for idempotent consumer
          },
          }],
      });
    };
    try {
      await sendPayload(this.producer)(publisherTopic)(user.id)(JSON.stringify(user.name));
    } catch (e) {
      console.error('Caught Error while sending:', e);
    }
  }
}
