// service/src/login/login.service.ts
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcryptjs';

import { JwtService } from '@nestjs/jwt';

/**
 * @class
 * LoginServiceは、ユーザーのログインおよび認証関連の操作を担当するサービスです。
 */
@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    this.logger.log(`ログインリクエスト（サービス）: ${loginDto.email}`);

    const { email, password } = loginDto;

    // ユーザーの検索
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      this.logger.log(`ユーザー: ${user.email}`);
      throw new UnauthorizedException('メールアドレスが正しくありません');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('パスワードが正しくありません');
    }

    // JWTトークンの生成
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async getUserById(loginDto: LoginDto) {
    this.logger.log(`ログインリクエスト（サービス）: ${loginDto.email}`);
    const { email } = loginDto;

    // ユーザーの検索
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      this.logger.log(`ユーザー: ${user.email}`);
      throw new UnauthorizedException('メールアドレスが正しくありません');
    }

    return {
      userId: user.id,
    };
  }
}
