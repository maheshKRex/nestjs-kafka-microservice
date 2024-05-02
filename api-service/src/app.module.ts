import { Module } from '@nestjs/common';
import { KafkaProducerModule } from './common/producer/kafka-producer.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [KafkaProducerModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
