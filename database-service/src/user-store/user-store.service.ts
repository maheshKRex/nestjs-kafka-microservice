import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { User } from '../common/types/User';

@Injectable()
export class UserStoreService {
    constructor(private readonly userRepository: UsersRepository) {}
    createUser(user: User) {
        this.userRepository.save(user)
    }
    getUser(id: string): User {
        return this.userRepository.findOne(id);
    }
}
