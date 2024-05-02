import { Inject, Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

import {
  clientId,
  kafkaTopic,
  broker,
  connectionTimeout,
  authenticationTimeout,
  reauthenticationThreshold,
  uniqueProducerId
} from '../../../kafka-config.json';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService {
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
    });
  }

  async publishMessage(publisherTopic: string, user: CreateUserDto): Promise<void> {
    await this.producer.connect();
    let sendPayload =
    (producer: Producer) =>
    (topic: string) =>
    (key: string) =>
    (value: string) => {
      return producer.send({
        topic,
        messages: [{ key, value }],
      });
    };
    try {
      await sendPayload(this.producer)(publisherTopic)(user.id)(JSON.stringify(user.name));
    } catch (e) {
      console.error('Caught Error while sending:', e);
    }
    /* await this.producer.send({
      topic: kafkaTopic,
      messages: [
        { value: 'Hello KafkaJS user!' }],//[{ value: JSON.stringify(message) }],
    }); */
  }
}
