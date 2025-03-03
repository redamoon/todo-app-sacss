// service/src/login/login.controller.ts
import { Body, Controller, Post, Get, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return await this.loginService.login(loginDto);
  }

  @Get()
  async getUserById(@Body(ValidationPipe) loginDto: LoginDto) {
    return await this.loginService.getUserById(loginDto);
  }
}
