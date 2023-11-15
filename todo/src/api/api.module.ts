import { ConfigModule } from '@nestjs/config';
import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from 'src/database/todo.schema';
import { TodoModule } from 'src/todo/todo.module';
import { ApiTokenService } from './token.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env` }),
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
    forwardRef(() => TodoModule),
  ],
  controllers: [ApiController],
  providers: [ApiService, ApiTokenService, HttpModule],
  exports: [ApiService, ApiTokenService, HttpModule],
})
export class ApiModule {}
