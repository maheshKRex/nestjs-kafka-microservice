import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  private readonly getUserTopic;
  private readonly createUserTopic;

  constructor(
    @Inject('KAFKA_SERVICE') private readonly dataClient: ClientKafka,
    private readonly configService: ConfigService,
    ) {
      this.getUserTopic = configService.getOrThrow<string>('getUserTopic');
      this.createUserTopic = configService.getOrThrow<string>('createUserTopic');
    }
  
    async onModuleInit() {
      this.dataClient.subscribeToResponseOf(this.getUserTopic);
      await this.dataClient.connect();
    }
    
  create(createUserDto: CreateUserDto) {
    return this.dataClient.emit(this.createUserTopic, JSON.stringify(createUserDto));
  }

  get(id: string) {
    return this.dataClient.send(this.getUserTopic, id);
  }
}
