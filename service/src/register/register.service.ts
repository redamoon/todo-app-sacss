// service/src/register/register.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // メールアドレスの重複チェック
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('このメールアドレスは既に登録されています');
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザーの作成
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    // user: {
    //   id: user.id,
    //   email: user.email,
    // },
    // パスワードを除外してユーザー情報を返す
    const { password: _, ...result } = user;
    return result;
  }
}
