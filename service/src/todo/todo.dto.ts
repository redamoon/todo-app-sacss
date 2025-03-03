import { IsOptional, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  text: string;

  userId: number;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  text?: string;
}

export class Todo {
  id: string;
  text: string;
  userId: number;
}
