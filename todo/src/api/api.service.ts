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
  ): Promise<ApiCreateResponse> {
    try {
      const todo = this.todoService.createTodo(ownerId, createTodo);
      return { id: (await todo).id };
    } catch (error) {
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async get(ownerId: Types.ObjectId): Promise<ApiGetResponse[]> {
    try {
      const todos = await this.todoService.findAllById(ownerId);

      const formattedTodos = todos.map((todo) => ({
        id: todo._id,
        title: todo.title,
        description: todo.description,
      }));

      return formattedTodos;
    } catch (error) {
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(
    ownerId: Types.ObjectId,
    deleteTodo: DeleteTodoDto,
  ): Promise<ApiDeleteResponse> {
    try {
      const existingTodo = await this.todoService.findById(deleteTodo.id);
      if (!existingTodo) {
        throw new HttpException('Todo is not found...', HttpStatus.NOT_FOUND);
      }

      const deletedTodo = await this.todoService.deleteTodo(
        ownerId,
        deleteTodo.id,
      );

      return deletedTodo;
    } catch (error) {
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
