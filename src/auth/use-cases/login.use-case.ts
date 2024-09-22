import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserTypeOrmRepository } from '../../users/user.repository';
import * as crypto from 'crypto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserTypeOrmRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string): Promise<any> {
    const userExists = await this.userRepository.findOneByEmail(email);
    if (!userExists) {
      throw new Error('User not found');
    }

    const isPasswordValid = this.verifyPassword(password, userExists.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const payload = { userEmail: userExists.email, userName: userExists.name };
    const token = {
      access_token: await this.jwtService.signAsync(payload),
    };

    return token;
  }

  private verifyPassword(password: string, hashedPassword: string): boolean {
    const hash = crypto
      .createHash('sha256')
      .update(password ?? '')
      .digest('hex');
    return hash === hashedPassword;
  }
}
