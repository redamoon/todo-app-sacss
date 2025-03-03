import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { LoginModule } from './login/login.module';
import { TodoModule } from './todo/todo.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [ConfigModule.forRoot(), LoginModule, TodoModule, RegisterModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
