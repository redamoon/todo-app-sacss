// service/src/register/register.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() registerDto: RegisterDto) {
    return await this.registerService.register(registerDto);
  }
}
