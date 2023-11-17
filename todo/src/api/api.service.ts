import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TodoService } from 'src/todo/todo.service';
import { CreateTodoDto } from './dto/createTodo.dto';
import {
  ApiCreateResponse,
  ApiDeleteResponse,
  ApiGetResponse,
} from 'src/utils/types';
import { Types } from 'mongoose';
import { DeleteTodoDto } from './dto/deleteTodo.dto';

@Injectable()
export class ApiService {
  constructor(private readonly todoService: TodoService) {}

  async create(
    ownerId: Types.ObjectId,
    createTodo: CreateTodoDto,
  ): Promise<ApiCreateResponse | HttpException> {
    try {
      const todo = this.todoService.createTodo(ownerId, createTodo);

      return { id: (await todo).id };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw error;
      }
    }
  }

  async get(
    ownerId: Types.ObjectId,
  ): Promise<ApiGetResponse[] | HttpException> {
    try {
      const todos = await this.todoService.findAllById(ownerId);

      const formattedTodos = todos.map((todo) => ({
        id: todo._id,
        title: todo.title,
        description: todo.description,
      }));

      return formattedTodos;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw error;
      }
    }
  }

  async delete(
    ownerId: Types.ObjectId,
    deleteTodo: DeleteTodoDto,
  ): Promise<ApiDeleteResponse | HttpException> {
    try {
      const existingTodo = await this.todoService.findById(deleteTodo.id);
      if (!existingTodo)
        throw new HttpException('Todo is not found...', HttpStatus.NOT_FOUND);

      const deletedTodo = await this.todoService.deleteTodo(
        ownerId,
        deleteTodo.id,
      );
      if (deletedTodo === null)
        throw new HttpException('Is not an owner!', HttpStatus.FORBIDDEN);

      return deletedTodo;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw error;
      }
    }
  }
}
