import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../user.repository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  execute() {
    return this.userRepo.findAll();
  }
}
