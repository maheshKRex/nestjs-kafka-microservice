import { Module } from '@nestjs/common';
import { UserStoreModule } from './user-store/user-store.module';

@Module({
  imports: [UserStoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
