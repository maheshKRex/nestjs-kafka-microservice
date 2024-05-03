import { Module } from '@nestjs/common';
import { KafkaProducerModule } from './common/producer/kafka-producer.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    KafkaProducerModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
