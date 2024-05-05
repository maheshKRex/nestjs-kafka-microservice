import { Controller, ParseIntPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserStoreService } from './user-store.service';
import { User } from 'src/common/types/User';

@Controller('user-store')
export class UserStoreController {
  constructor(private readonly userStoreService: UserStoreService) {}
  @EventPattern('create_user')
  handleUserCreate(@Payload() data: User) {
    console.log("event received %j", data);
    this.userStoreService.createUser(data as User);
  }

  @MessagePattern('get_user')
  getHello(@Payload(ParseIntPipe) id) {
    return JSON.stringify(this.userStoreService.getUser(id));
  }
}
