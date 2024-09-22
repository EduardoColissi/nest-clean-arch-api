import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './use-cases/login.use-case';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants/constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUseCase],
})
export class AuthModule {}
