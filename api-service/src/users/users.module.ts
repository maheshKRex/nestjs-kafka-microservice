import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { KafkaProducerService } from 'src/common/producer/kafka-producer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
        {
            name: 'DATABASE_SERVICE',
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'kafkaSample',
                    brokers: ['localhost:9092'],
                },
                consumer: {
                    groupId: 'my-kafka-consumer',
                },
            },
        }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, KafkaProducerService]
})
export class UsersModule {}
