import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';
import { LoginDto } from './dto/login.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(RMQ_CONSTANTS.PATTERN.LOGIN)
  async login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern(RMQ_CONSTANTS.PATTERN.REGISTER)
  async register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
