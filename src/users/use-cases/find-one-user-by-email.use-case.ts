import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../user.repository';

@Injectable()
export class FindOneUserByEmailUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  execute(email: string) {
    return this.userRepo.findOneByEmail(email);
  }
}
