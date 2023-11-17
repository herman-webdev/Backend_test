import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Todo, TodoDocument } from 'src/database/todo.schema';
import { CreateTodoDto } from 'src/api/dto/createTodo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findById(id: Types.ObjectId): Promise<TodoDocument> {
    return await this.todoModel.findById(id);
  }

  async findAllById(ownerId: Types.ObjectId): Promise<TodoDocument[]> {
    return await this.todoModel.find({ owner: ownerId }).exec();
  }

  async createTodo(
    ownerId: Types.ObjectId,
    createTodo: CreateTodoDto,
  ): Promise<TodoDocument> {
    const todo = await this.todoModel.create({
      owner: ownerId,
      title: createTodo.title,
      description: createTodo.description,
    });

    return todo.save();
  }

  async deleteTodo(
    ownerId: Types.ObjectId,
    todoId: Types.ObjectId,
  ): Promise<{ id: Types.ObjectId } | null> {
    const deletedTodo = await this.todoModel.findOneAndDelete({
      _id: todoId,
      owner: ownerId,
    });

    if (!deletedTodo) {
      return null;
    }

    return { id: deletedTodo._id };
  }
}
