import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserStoreService } from './user-store.service';

@Controller('user-store')
export class UserStoreController {
  constructor(
    private readonly userStoreService: UserStoreService,
  ) {}
  @MessagePattern('get_user')
  getHello(@Payload(ParseIntPipe) id) {
    return JSON.stringify(this.userStoreService.getUser(id));
  }
}
