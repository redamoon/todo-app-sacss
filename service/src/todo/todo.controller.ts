import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * Get all todos by userId
   * @param userId ※ Query のため 数値形に変換
   */
  @Get()
  getTodoById(@Query('userId', ParseIntPipe) userId: number) {
    return this.todoService.findAll(userId);
  }

  /**
   * Create a new todo
   * @param createTodoDto
   */
  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  // @Put(':id')
  // updateTodo(@Param('id') id: number, @Body() updateTodoDto: any) {
  //   return this.todoService.update(id, updateTodoDto);
  // }

  @Delete(':id')
  deleteTodoById(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
