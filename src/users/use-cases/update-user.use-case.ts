/* eslint-disable @typescript-eslint/no-unused-expressions */
import { UpdateUserDto } from '../dto/update-user.dto';
import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../user.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: string, input: UpdateUserDto) {
    const user = await this.userRepo.findOneById(id);

    if (!user) {
      throw new Error('User not found');
    }
    if (input.email) {
      const userEmailExists = await this.userRepo.findOneByEmail(input.email);
      if (userEmailExists.id !== id) {
        throw new Error('Email already exists');
      }
    }

    input.name && (user.name = input.name);
    input.email && (user.email = input.email);
    input.password && (user.password = user.createHash(input.password));
    user.updated_at = new Date();

    await this.userRepo.update(user);
    return user;
  }
}
