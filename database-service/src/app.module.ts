import { Module } from '@nestjs/common';
import { UserStoreModule } from './user-store/user-store.module';
import { IdempotentConsumerModule } from './common/consumer/idempotent-consumer.module';

@Module({
  imports: [UserStoreModule, IdempotentConsumerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
