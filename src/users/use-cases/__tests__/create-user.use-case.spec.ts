import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../create-user.use-case';
import { IUserRepository } from '../../user.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryMock: jest.Mocked<IUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: 'IUserRepository',
          useValue: {
            findOneByEmail: jest.fn(), // Mocka os métodos que você quer testar
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepositoryMock = module.get('IUserRepository'); // Converte para Mocked<IUserRepository>
  });

  it('should create new user with success', async () => {
    const input: CreateUserDto = {
      name: 'Eduardo',
      email: 'eduardocolissi@gmail.com',
      password: 'password123',
    };

    userRepositoryMock.findOneByEmail.mockResolvedValue(null); // Simula usuário inexistente

    const result = await createUserUseCase.execute(input);

    expect(userRepositoryMock.findOneByEmail).toHaveBeenCalledWith(input.email);
    expect(userRepositoryMock.create).toHaveBeenCalledWith(expect.any(User));
    expect(result).toBeInstanceOf(User);
    expect(result.email).toBe(input.email);
  });

  it('should throw error if user already exists', async () => {
    const input: CreateUserDto = {
      name: 'Eduardo',
      email: 'eduardocolissi@gmail.com',
      password: 'password123',
    };

    const existingUser = new User({
      name: 'Eduardo',
      email: 'eduardocolissi@gmail.com',
      password: 'hashedpassword',
    });

    userRepositoryMock.findOneByEmail.mockResolvedValue(existingUser); // Simula usuário já existente

    await expect(createUserUseCase.execute(input)).rejects.toThrow(
      'User already exists',
    );
    expect(userRepositoryMock.findOneByEmail).toHaveBeenCalledWith(input.email);
    expect(userRepositoryMock.create).not.toHaveBeenCalled();
  });
});
