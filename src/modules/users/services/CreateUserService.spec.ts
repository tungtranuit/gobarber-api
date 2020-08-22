import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Wladimir',
      email: 'wladimir@gmail.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an email already registered', async () => {
    await createUser.execute({
      name: 'Wladimir',
      email: 'wladimir@gmail.com',
      password: '12345678',
    });

    await expect(
      createUser.execute({
        name: 'Wladimir',
        email: 'wladimir@gmail.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
