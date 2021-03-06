import { AppError } from '@shared/errors/AppError';
import { IAccountsRepository } from '@modules/accounts/repositories/IAccountsRepository';
import { AccountsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { CreateAccountUseCase } from './CreateAccountUseCase';

let accountRepositoryInMemory: IAccountsRepository;
let createAccountUseCase: CreateAccountUseCase;

describe('create account use case', () => {
  beforeEach(() => {
    accountRepositoryInMemory = new AccountsRepositoryInMemory();
    createAccountUseCase = new CreateAccountUseCase(accountRepositoryInMemory);
  });

  it('should be able to create a new account', async () => {
    const account = await createAccountUseCase.execute({
      username: 'test',
      email: 'test@example.com',
      password: 'testword',
    });

    expect(account).toHaveProperty('id');
  });

  it('should not be able to create a new account without all fields inserted', async () => {
    expect(async () => {
      await createAccountUseCase.execute({
        username: '',
        email: 'test1@example.com',
        password: 'testword',
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createAccountUseCase.execute({
        username: 'test2',
        email: '',
        password: 'testword',
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createAccountUseCase.execute({
        username: 'test3',
        email: 'test3@example.com',
        password: '',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new account with an username already taken', async () => {
    await createAccountUseCase.execute({
      username: 'test',
      email: 'test@example.com',
      password: 'testword',
    });

    expect(async () => {
      await createAccountUseCase.execute({
        username: 'test',
        email: 'test_email@example.com',
        password: 'testword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new account with an email already taken', async () => {
    await createAccountUseCase.execute({
      username: 'one_test_username',
      email: 'test@example.com',
      password: 'testword',
    });

    expect(async () => {
      await createAccountUseCase.execute({
        username: 'other_test_username',
        email: 'test@example.com',
        password: 'testword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
