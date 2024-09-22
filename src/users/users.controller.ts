import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindAllUsersUseCase } from './use-cases/find-all-users.use-case';
import { FindOneUserByIdUseCase } from './use-cases/find-one-user-by-id.use-case';
import { FindOneUserByEmailUseCase } from './use-cases/find-one-user-by-email.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { Public } from './constants/constants';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findOneUserByIdUseCase: FindOneUserByIdUseCase,
    private readonly findOneUserByEmailUseCase: FindOneUserByEmailUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.findAllUsersUseCase.execute();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.findOneUserByIdUseCase.execute(id);
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.findOneUserByEmailUseCase.execute(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }
}
