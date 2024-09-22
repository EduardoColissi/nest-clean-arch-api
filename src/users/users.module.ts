import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindAllUsersUseCase } from './use-cases/find-all-users.use-case';
import { FindOneUserByIdUseCase } from './use-cases/find-one-user-by-id.use-case';
import { FindOneUserByEmailUseCase } from './use-cases/find-one-user-by-email.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { UserTypeOrmRepository } from './user.repository';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindOneUserByIdUseCase,
    FindOneUserByEmailUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    UserTypeOrmRepository,
    {
      provide: 'IUserRepository',
      useExisting: UserTypeOrmRepository,
    },
  ],
  exports: [UserTypeOrmRepository],
})
export class UsersModule {}
