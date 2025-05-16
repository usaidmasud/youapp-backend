import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: LoginDto) {
    const validate = await this.userService.validateUser(
      payload.usernameOrEmail,
      payload.password,
    );
    if (!validate) {
      throw new RpcException({
        message: 'Invalid credentials',
        code: 401,
      });
    }
    const token = await this.jwtService.signAsync({
      sub: validate._id,
      username: validate.username,
      email: validate.email,
    });
    return {
      accessToken: token,
    };
  }

  async register(payload: RegisterDto) {
    const user = await this.userService.createUser(payload);
    return user;
  }
}
