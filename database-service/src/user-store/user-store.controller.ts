import { Controller, ParseIntPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { kafkaTopic } from '../../kafka-config.json'
import { UserStoreService } from './user-store.service';
import { MessageDto, decodeMessage } from 'src/common/message/message.dto';
import { User } from 'src/common/types/User';

@Controller('user-store')
export class UserStoreController {
  constructor(private readonly userStoreService: UserStoreService) {}
  @EventPattern('create_user')
  handleUserCreate(@Payload() data: MessageDto) {
    console.log("event received %j", data);
    let values = decodeMessage(data).value;
    this.userStoreService.createUser(values as User);
  }

  @MessagePattern('get_user')
  getHello(@Payload() message) {
    console.log(message.value);
    return JSON.stringify(this.userStoreService.getUser(message.value));
  }
}
