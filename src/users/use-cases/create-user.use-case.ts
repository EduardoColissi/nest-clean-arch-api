import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: CreateUserDto) {
    const userExists = await this.userRepo.findOneByEmail(input.email);
    if (userExists) {
      throw new Error('User already exists');
    }
    const user = new User(input);
    await this.userRepo.create(user);
    return user;
  }
}
