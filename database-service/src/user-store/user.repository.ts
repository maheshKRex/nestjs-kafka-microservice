import { Injectable } from '@nestjs/common';
import { User } from '../common/types/User';

@Injectable()
export class UsersRepository {
  private readonly users: User[] = [];

  save(user: User) {
    this.users.push({ ...user, id: user.id });
    console.log(this.users);
  }

  findOne(id: string) {
    return this.users.find((u) => u.id === id) || null;
  }
}