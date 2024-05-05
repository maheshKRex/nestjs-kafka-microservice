import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { IdempotentProducerService } from 'src/common/producer/idempontent-producer.service';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    private readonly idempotentProducerService: IdempotentProducerService,
    @Inject('DATABASE_SERVICE') private readonly dataClient: ClientKafka,
    private readonly configService: ConfigService,
    ) {}
  
    async onModuleInit() {
      this.dataClient.subscribeToResponseOf('get_user');
      await this.dataClient.connect();
    }
    
  create(createUserDto: CreateUserDto) {
    //return this.dataClient.emit('create_user', JSON.stringify(createUserDto));
    return this.idempotentProducerService.publishMessage('idempotent_create_user', createUserDto); //TODO: address idempotency on inserting events to kafka // 
  }

  get(id: string) {
    console.log(id);
    return this.dataClient.send('get_user', id);
  }
}
