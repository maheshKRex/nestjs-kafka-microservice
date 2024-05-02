import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { KafkaProducerService } from 'src/common/producer/kafka-producer.service';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    private readonly kafkaProducerService: KafkaProducerService,
    @Inject('DATABASE_SERVICE') private readonly dataClient: ClientKafka
    ) {}
  
    async onModuleInit() {
      this.dataClient.subscribeToResponseOf('get_user');
      await this.dataClient.connect();
    }
    
  create(createUserDto: CreateUserDto) {
    return this.dataClient.emit('create_user', JSON.stringify(createUserDto));
    //TODO: address idempotency on inserting events to kafka // return this.kafkaProducerService.publishMessage('create_user', createUserDto);
  }

  get(id: string) {
    console.log(id);
    return this.dataClient.send('get_user', id);
  }
}
