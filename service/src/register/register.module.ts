// service/src/register/register.module.ts
import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService, PrismaService],
})
export class RegisterModule {}
