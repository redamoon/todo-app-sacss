// service/src/todo/todo.service.ts
import { ulid } from 'ulid';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './todo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    if (!createTodoDto.userId) {
      throw new Error('ユーザーIDが必要です');
    }

    return this.prisma.todo.create({
      data: {
        id: ulid(),
        text: createTodoDto.text,
        user: {
          connect: {
            id: createTodoDto.userId, // ここで数値型のユーザーIDを使用
          },
        },
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  // async findOne(id: string, userId: number) {
  //   const todo = await this.prisma.todo.findFirst({
  //     where: { id, userId },
  //   });
  //   if (!todo) {
  //     throw new NotFoundException(`Todo with ID ${id} not found`);
  //   }
  //   return todo;
  // }

  // async update(id: string, userId: number, updateTodoDto: UpdateTodoDto) {
  //   await this.findOne(id, userId);
  //   return this.prisma.todo.update({
  //     where: { id },
  //     data: {
  //       ...updateTodoDto,
  //     },
  //   });
  // }
  //
  async delete(id: string): Promise<void> {
    await this.prisma.todo.delete({
      where: { id },
    });
  }
}
