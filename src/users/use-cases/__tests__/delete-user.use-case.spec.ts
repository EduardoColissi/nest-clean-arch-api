import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserUseCase } from '../delete-user.use-case';
import { IUserRepository } from '../../user.repository';
import { User } from '../../entities/user.entity';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let userRepositoryMock: jest.Mocked<IUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: 'IUserRepository',
          useValue: {
            findOneById: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    userRepositoryMock = module.get('IUserRepository'); // Mocked<IUserRepository>
  });

  it('should delete user with success', async () => {
    const userId = '123';
    const existingUser = new User(
      {
        name: 'Eduardo',
        email: 'eduardo@gmail.com',
        password: 'hashedpassword',
      },
      userId,
    );

    userRepositoryMock.findOneById.mockResolvedValue(existingUser);

    await deleteUserUseCase.execute(userId);

    expect(userRepositoryMock.findOneById).toHaveBeenCalledWith(userId);

    expect(userRepositoryMock.delete).toHaveBeenCalledWith(userId);
  });

  it('should throw error if user does not exist', async () => {
    const userId = 'non-existent-id';

    userRepositoryMock.findOneById.mockResolvedValue(null);

    await expect(deleteUserUseCase.execute(userId)).rejects.toThrow(
      'User not found',
    );

    expect(userRepositoryMock.delete).not.toHaveBeenCalled();
  });
});
