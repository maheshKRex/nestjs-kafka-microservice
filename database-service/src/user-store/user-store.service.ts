import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { MessageDto } from 'src/common/message/message.dto';
import { UsersRepository } from './user.repository';
import { User } from '../common/types/User';

interface DecodedMessage {
    value: MessageDto['value'];
    headers: MessageDto['headers'];
}

@Injectable()
export class UserStoreService {
    constructor(private readonly userRepository: UsersRepository) {}
    createUser(user: User) {
        this.userRepository.save(user)
    }
    getUser(id: string): User {
        return this.userRepository.findOne(id)
    }
}
