// service/src/login/login.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  email: string;

  @IsString()
  @MinLength(4, { message: 'パスワードは4文字以上である必要があります' })
  password: string;
}
