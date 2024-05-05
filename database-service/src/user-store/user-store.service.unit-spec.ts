import { UsersRepository } from './user.repository'
import { User } from '../common/types/User';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = new UsersRepository();
  });

  describe('save', () => {
    it('should save a user to the repository', () => {
      const user: User = { id: '1', name: 'John Doe' };
      usersRepository.save(user);

      expect(usersRepository['users']).toContainEqual({ id: '1', name: 'John Doe' });
    });
  });

  describe('findOne', () => {
    beforeEach(() => {
      usersRepository.save({ id: '1', name: 'John Doe' });
    });

    it('should find a user by id', () => {
      const foundUser = usersRepository.findOne('1');
      expect(foundUser).toEqual({ id: '1', name: 'John Doe' });
    });

    it('should return null if user is not found', () => {
      const foundUser = usersRepository.findOne('2');
      expect(foundUser).toBeNull();
    });
  });
});
