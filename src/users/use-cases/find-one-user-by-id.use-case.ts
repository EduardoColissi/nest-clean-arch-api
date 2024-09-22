import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../user.repository';

@Injectable()
export class FindOneUserByIdUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  execute(id: string) {
    return this.userRepo.findOneById(id);
  }
}
