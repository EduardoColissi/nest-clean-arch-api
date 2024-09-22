import {
  Body,
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginUseCase } from './use-cases/login.use-case';
import { AuthGuard } from './auth.guard';
import { Public } from './constants/constants';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() auth: AuthDto) {
    return await this.loginUseCase.execute(auth.email, auth.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
