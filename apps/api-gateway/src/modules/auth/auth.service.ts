import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from '@apps/user-service/src/modules/auth/dto/login.dto';
import { RegisterDto } from '@apps/user-service/src/modules/auth/dto/register.dto';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(RMQ_CONSTANTS.SERVICE.USER)
    private readonly authClient: ClientProxy,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      return await lastValueFrom(
        this.authClient.send(RMQ_CONSTANTS.PATTERN.LOGIN, loginDto),
      );
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      return await lastValueFrom(
        this.authClient.send(RMQ_CONSTANTS.PATTERN.REGISTER, registerDto),
      );
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
