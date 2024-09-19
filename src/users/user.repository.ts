import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export interface IUserRepository {
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepo: Repository<User>,
  ) {}

  async create(user: User): Promise<void> {
    await this.typeOrmRepo.save(user);
  }

  async update(user: User): Promise<void> {
    await this.typeOrmRepo.update(user.id, user);
  }

  findAll(): Promise<User[]> {
    return this.typeOrmRepo.find();
  }

  findOne(id: string): Promise<User> {
    return this.typeOrmRepo.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }
}
