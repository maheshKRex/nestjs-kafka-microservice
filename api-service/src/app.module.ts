import { Module } from '@nestjs/common';
import { IdempotentProducerModule } from './common/producer/idempotent-producer.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    IdempotentProducerModule,
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
